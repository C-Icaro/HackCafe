from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "análise-preditiva" / "dataset_manifest.json"

REQUIRED_DATASET_KEYS = {
    "id",
    "name",
    "tier",
    "fit_score",
    "source_url",
    "license",
    "tasks",
    "classes",
    "use_for",
    "risks",
}


def main() -> None:
    if not MANIFEST.exists():
        raise AssertionError(f"Manifest nao encontrado: {MANIFEST}")

    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    datasets = data.get("datasets", [])
    if len(datasets) < 5:
        raise AssertionError("Manifest deve registrar ao menos 5 datasets candidatos")

    ids = [dataset["id"] for dataset in datasets]
    if len(ids) != len(set(ids)):
        raise AssertionError("IDs de datasets duplicados no manifest")

    if data.get("decision", {}).get("primary_dataset") != "bracol":
        raise AssertionError("BRACOL deve permanecer como dataset primario inicial")

    for dataset in datasets:
        missing = REQUIRED_DATASET_KEYS - set(dataset)
        if missing:
            raise AssertionError(
                f"Dataset {dataset.get('id', '<sem id>')} sem chaves: {sorted(missing)}"
            )

        if dataset["tier"] not in {"A", "A-", "B+", "B", "C+", "C"}:
            raise AssertionError(f"Tier invalido em {dataset['id']}: {dataset['tier']}")

        if not isinstance(dataset["fit_score"], int) or not 0 <= dataset["fit_score"] <= 100:
            raise AssertionError(f"fit_score invalido em {dataset['id']}")

        if not dataset["source_url"].startswith("https://"):
            raise AssertionError(f"source_url deve ser HTTPS em {dataset['id']}")

        for field in ("tasks", "classes", "use_for", "risks"):
            if not dataset[field]:
                raise AssertionError(f"{field} vazio em {dataset['id']}")

    print("Smoke CV dataset manifest OK")
    print(f"Datasets registered: {len(datasets)}")
    print(f"Primary dataset: {data['decision']['primary_dataset']}")


if __name__ == "__main__":
    main()
