from __future__ import annotations

import json
import subprocess
import sys
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def main() -> None:
    output = Path(tempfile.gettempdir()) / "hackcafe_cv_model_quality_smoke.json"
    if output.exists():
        output.unlink()

    subprocess.run(
        [
            sys.executable,
            str(ROOT / "análise-preditiva" / "evaluate_cv_model_quality.py"),
            "--sample-size",
            "0",
            "--output",
            str(output),
        ],
        cwd=ROOT,
        check=True,
    )

    report = json.loads(output.read_text(encoding="utf-8"))

    if report["model_task"] != "detect":
        raise AssertionError(f"Expected default model to be detect, got {report['model_task']}")

    if report["metrics_available"]:
        raise AssertionError("Default YOLO COCO detector must not expose BRACOL disease metrics")

    if report["quality_gate"] != "not_evaluable":
        raise AssertionError(f"Expected not_evaluable gate, got {report['quality_gate']}")

    if report["target_class_overlap"]:
        raise AssertionError(f"Default model should not overlap BRACOL classes: {report['target_class_overlap']}")

    print("Smoke CV model quality OK")
    print(f"Model task: {report['model_task']}")
    print(f"Reason: {report['reason']}")


if __name__ == "__main__":
    main()
