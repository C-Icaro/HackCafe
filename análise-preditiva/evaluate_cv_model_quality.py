from __future__ import annotations

import argparse
import csv
import json
import random
import time
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any

from ultralytics import YOLO

from prepare_bracol_classification import CLASS_NAMES, EXCLUDED_LABELS, default_source


TARGET_CLASSES = list(CLASS_NAMES.values())


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Evaluate HackCafe computer vision model quality against BRACOL when compatible."
    )
    parser.add_argument("--model", type=Path, default=Path(__file__).resolve().parent / "yolov8n.pt")
    parser.add_argument("--dataset", type=Path, default=default_source())
    parser.add_argument("--output", type=Path, default=Path("runs/evaluation/cv_model_quality.json"))
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--sample-size", type=int, default=24)
    parser.add_argument("--conf", type=float, default=0.25)
    return parser.parse_args()


def load_rows(dataset: Path) -> list[dict[str, str]]:
    csv_path = dataset / "dataset.csv"
    with csv_path.open(newline="", encoding="utf-8") as file:
        return list(csv.DictReader(file))


def split_group(items: list[dict[str, str]], train: float = 0.7, val: float = 0.15) -> dict[str, list[dict[str, str]]]:
    train_end = int(len(items) * train)
    val_end = train_end + int(len(items) * val)
    return {
        "train": items[:train_end],
        "val": items[train_end:val_end],
        "test": items[val_end:],
    }


def bracol_splits(dataset: Path, seed: int) -> tuple[dict[str, list[dict[str, str]]], dict[str, Any]]:
    rows = load_rows(dataset)
    images_dir = dataset / "images"
    grouped: dict[str, list[dict[str, str]]] = defaultdict(list)
    excluded = Counter()
    missing_images = 0

    for row in rows:
        label = row["predominant_stress"]
        if label in EXCLUDED_LABELS or label not in CLASS_NAMES:
            excluded[label] += 1
            continue

        image_path = images_dir / f"{row['id']}.jpg"
        if not image_path.exists():
            missing_images += 1
            continue

        grouped[label].append(row)

    rng = random.Random(seed)
    splits: dict[str, list[dict[str, str]]] = {"train": [], "val": [], "test": []}
    split_counts: dict[str, dict[str, int]] = {split: {} for split in splits}

    for label, items in sorted(grouped.items()):
        rng.shuffle(items)
        class_name = CLASS_NAMES[label]
        for split, split_items in split_group(items).items():
            splits[split].extend(split_items)
            split_counts[split][class_name] = len(split_items)

    summary = {
        "rows": len(rows),
        "target_classes": TARGET_CLASSES,
        "split_counts": split_counts,
        "excluded": dict(sorted(excluded.items())),
        "missing_images": missing_images,
        "total_used": sum(len(items) for items in splits.values()),
    }
    return splits, summary


def normalize_name(name: str) -> str:
    return name.strip().lower().replace(" ", "_").replace("-", "_")


def model_class_names(model: YOLO) -> list[str]:
    names = getattr(model, "names", {})
    if isinstance(names, dict):
        return [str(names[key]) for key in sorted(names)]
    if isinstance(names, list):
        return [str(name) for name in names]
    return []


def class_overlap(model_names: list[str]) -> list[str]:
    model_norm = {normalize_name(name) for name in model_names}
    return [name for name in TARGET_CLASSES if normalize_name(name) in model_norm]


def empty_metrics() -> dict[str, Any]:
    return {
        "accuracy": None,
        "macro_precision": None,
        "macro_recall": None,
        "macro_f1": None,
        "weighted_precision": None,
        "weighted_recall": None,
        "weighted_f1": None,
        "per_class": {},
        "confusion_matrix": None,
    }


def compute_metrics(y_true: list[str], y_pred: list[str], classes: list[str]) -> dict[str, Any]:
    matrix = {actual: {predicted: 0 for predicted in classes} for actual in classes}
    for actual, predicted in zip(y_true, y_pred):
        matrix[actual][predicted] += 1

    per_class = {}
    total = len(y_true)
    correct = sum(matrix[name][name] for name in classes)
    weighted = {"precision": 0.0, "recall": 0.0, "f1": 0.0}
    macro = {"precision": 0.0, "recall": 0.0, "f1": 0.0}

    for name in classes:
        tp = matrix[name][name]
        fp = sum(matrix[actual][name] for actual in classes if actual != name)
        fn = sum(matrix[name][predicted] for predicted in classes if predicted != name)
        support = sum(matrix[name].values())
        precision = tp / (tp + fp) if (tp + fp) else 0.0
        recall = tp / (tp + fn) if (tp + fn) else 0.0
        f1 = 2 * precision * recall / (precision + recall) if (precision + recall) else 0.0

        per_class[name] = {
            "precision": precision,
            "recall": recall,
            "f1": f1,
            "support": support,
            "tp": tp,
            "fp": fp,
            "fn": fn,
        }
        macro["precision"] += precision
        macro["recall"] += recall
        macro["f1"] += f1
        weighted["precision"] += precision * support
        weighted["recall"] += recall * support
        weighted["f1"] += f1 * support

    class_count = len(classes)
    return {
        "accuracy": correct / total if total else 0.0,
        "macro_precision": macro["precision"] / class_count if class_count else 0.0,
        "macro_recall": macro["recall"] / class_count if class_count else 0.0,
        "macro_f1": macro["f1"] / class_count if class_count else 0.0,
        "weighted_precision": weighted["precision"] / total if total else 0.0,
        "weighted_recall": weighted["recall"] / total if total else 0.0,
        "weighted_f1": weighted["f1"] / total if total else 0.0,
        "per_class": per_class,
        "confusion_matrix": matrix,
    }


def evaluate_classifier(model: YOLO, rows: list[dict[str, str]], dataset: Path) -> dict[str, Any]:
    y_true: list[str] = []
    y_pred: list[str] = []
    names = model_class_names(model)
    normalized_to_target = {normalize_name(name): name for name in TARGET_CLASSES}

    for row in rows:
        image_path = dataset / "images" / f"{row['id']}.jpg"
        result = model.predict(str(image_path), verbose=False)[0]
        top1 = int(result.probs.top1)
        predicted_name = names[top1]
        normalized_pred = normalize_name(predicted_name)
        if normalized_pred not in normalized_to_target:
            raise ValueError(f"Classifier predicted class outside BRACOL target set: {predicted_name}")

        y_true.append(CLASS_NAMES[row["predominant_stress"]])
        y_pred.append(normalized_to_target[normalized_pred])

    return compute_metrics(y_true, y_pred, TARGET_CLASSES)


def detection_smoke(model: YOLO, rows: list[dict[str, str]], dataset: Path, sample_size: int, conf: float, seed: int) -> dict[str, Any]:
    if sample_size <= 0:
        return {"sample_size": 0, "detections": [], "class_counts": {}}

    rng = random.Random(seed)
    sample = rows[:]
    rng.shuffle(sample)
    sample = sample[: min(sample_size, len(sample))]

    detections = []
    class_counts = Counter()
    started = time.perf_counter()

    for row in sample:
        image_path = dataset / "images" / f"{row['id']}.jpg"
        result = model.predict(str(image_path), conf=conf, verbose=False)[0]
        boxes = result.boxes
        image_detections = []
        if boxes is not None:
            for box in boxes:
                cls = int(box.cls[0].item())
                name = model.names[cls]
                score = float(box.conf[0].item())
                image_detections.append({"class": name, "confidence": score})
                class_counts[str(name)] += 1

        detections.append(
            {
                "image_id": row["id"],
                "ground_truth_class": CLASS_NAMES[row["predominant_stress"]],
                "detections": image_detections,
            }
        )

    elapsed = time.perf_counter() - started
    return {
        "sample_size": len(sample),
        "confidence_threshold": conf,
        "elapsed_seconds": elapsed,
        "images_per_second": len(sample) / elapsed if elapsed else None,
        "class_counts": dict(class_counts),
        "detections": detections,
    }


def evaluate(args: argparse.Namespace) -> dict[str, Any]:
    model = YOLO(str(args.model))
    model_names = model_class_names(model)
    splits, dataset_summary = bracol_splits(args.dataset, args.seed)
    test_rows = splits["test"]
    overlap = class_overlap(model_names)
    task = str(getattr(model, "task", "unknown"))

    report: dict[str, Any] = {
        "model_path": str(args.model),
        "model_task": task,
        "model_class_count": len(model_names),
        "model_classes_preview": model_names[:20],
        "dataset": dataset_summary,
        "evaluation_split": "test",
        "evaluation_items": len(test_rows),
        "target_class_overlap": overlap,
        "metrics_available": False,
        "quality_gate": "not_evaluable",
        "reason": "",
        "metrics": empty_metrics(),
        "detection_smoke": None,
    }

    if task == "classify":
        if len(overlap) != len(TARGET_CLASSES):
            report["reason"] = "classification_model_class_space_does_not_match_bracol_targets"
            return report

        report["metrics"] = evaluate_classifier(model, test_rows, args.dataset)
        report["metrics_available"] = True
        report["quality_gate"] = "evaluated"
        report["reason"] = "classification_model_matches_bracol_targets"
        return report

    if task == "detect":
        report["reason"] = (
            "model_is_coco_object_detector_but_bracol_local_ground_truth_is_image_level_classification; "
            "precision_recall_map_for_coffee_disease_detection_requires task-specific classes and bounding-box labels"
        )
        report["detection_smoke"] = detection_smoke(
            model=model,
            rows=test_rows,
            dataset=args.dataset,
            sample_size=args.sample_size,
            conf=args.conf,
            seed=args.seed,
        )
        return report

    report["reason"] = f"unsupported_model_task:{task}"
    return report


def main() -> None:
    args = parse_args()
    report = evaluate(args)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps(report, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
