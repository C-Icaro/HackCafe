from __future__ import annotations

import argparse
import csv
import json
import random
import shutil
from collections import defaultdict
from pathlib import Path


CLASS_NAMES = {
    "0": "healthy",
    "1": "leaf_miner",
    "2": "leaf_rust",
    "3": "brown_leaf_spot_or_phoma",
    "4": "cercospora",
}
EXCLUDED_LABELS = {"5"}


def default_source() -> Path:
    return Path(__file__).resolve().parent / "coffee-datasets" / "leaf"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Prepare BRACOL leaf images in Ultralytics classification format."
    )
    parser.add_argument("--source", type=Path, default=default_source())
    parser.add_argument("--output", type=Path, default=Path("runs/datasets/bracol_cls"))
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--train", type=float, default=0.7)
    parser.add_argument("--val", type=float, default=0.15)
    parser.add_argument("--test", type=float, default=0.15)
    parser.add_argument(
        "--mode",
        choices=("copy", "hardlink", "symlink"),
        default="copy",
        help="How to materialize images in the output dataset.",
    )
    parser.add_argument("--dry-run", action="store_true")
    return parser.parse_args()


def load_rows(source: Path) -> list[dict[str, str]]:
    dataset_csv = source / "dataset.csv"
    if not dataset_csv.exists():
        raise FileNotFoundError(f"dataset.csv not found at {dataset_csv}")

    with dataset_csv.open(newline="", encoding="utf-8") as file:
        rows = list(csv.DictReader(file))

    if not rows:
        raise ValueError(f"dataset.csv is empty: {dataset_csv}")

    return rows


def split_group(
    items: list[dict[str, str]], train: float, val: float
) -> dict[str, list[dict[str, str]]]:
    train_end = int(len(items) * train)
    val_end = train_end + int(len(items) * val)
    return {
        "train": items[:train_end],
        "val": items[train_end:val_end],
        "test": items[val_end:],
    }


def materialize(src: Path, dst: Path, mode: str) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    if dst.exists():
        dst.unlink()

    if mode == "copy":
        shutil.copy2(src, dst)
    elif mode == "hardlink":
        dst.hardlink_to(src)
    else:
        dst.symlink_to(src.resolve())


def prepare(args: argparse.Namespace) -> dict[str, object]:
    rows = load_rows(args.source)
    images_dir = args.source / "images"
    if not images_dir.exists():
        raise FileNotFoundError(f"images directory not found at {images_dir}")

    grouped: dict[str, list[dict[str, str]]] = defaultdict(list)
    excluded: dict[str, int] = defaultdict(int)
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

    rng = random.Random(args.seed)
    splits: dict[str, dict[str, int]] = {split: {} for split in ("train", "val", "test")}

    if not args.dry_run:
        args.output.mkdir(parents=True, exist_ok=True)

    for label, items in sorted(grouped.items()):
        rng.shuffle(items)
        for split, split_items in split_group(items, args.train, args.val).items():
            class_name = CLASS_NAMES[label]
            splits[split][class_name] = len(split_items)
            if args.dry_run:
                continue

            for row in split_items:
                src = images_dir / f"{row['id']}.jpg"
                dst = args.output / split / class_name / src.name
                materialize(src, dst, args.mode)

    summary = {
        "source": str(args.source),
        "output": str(args.output),
        "seed": args.seed,
        "mode": args.mode,
        "dry_run": args.dry_run,
        "class_names": CLASS_NAMES,
        "splits": splits,
        "excluded": dict(sorted(excluded.items())),
        "missing_images": missing_images,
        "total_used": sum(sum(classes.values()) for classes in splits.values()),
    }

    if not args.dry_run:
        metadata_path = args.output / "metadata.json"
        metadata_path.write_text(
            json.dumps(summary, indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )

    return summary


def main() -> None:
    args = parse_args()
    if abs((args.train + args.val + args.test) - 1.0) > 0.001:
        raise ValueError("train + val + test must sum to 1.0")

    summary = prepare(args)
    print(json.dumps(summary, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
