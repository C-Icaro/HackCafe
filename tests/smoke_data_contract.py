from __future__ import annotations

import csv
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LEAF_DATASET = ROOT / "análise-preditiva" / "coffee-datasets" / "leaf" / "dataset.csv"
ASSET_DATASET = ROOT / "assets" / "coffee.csv"
WEB_PACKAGE = ROOT / "plataforma-web" / "package.json"

REQUIRED_LEAF_COLUMNS = {
    "id",
    "predominant_stress",
    "miner",
    "rust",
    "phoma",
    "cercospora",
    "severity",
}


def read_header(path: Path) -> list[str]:
    with path.open(newline="", encoding="utf-8") as file:
        reader = csv.reader(file)
        return next(reader)


def count_rows(path: Path) -> int:
    with path.open(newline="", encoding="utf-8") as file:
        return max(sum(1 for _ in file) - 1, 0)


def assert_exists(path: Path) -> None:
    if not path.exists():
        raise AssertionError(f"Arquivo esperado nao encontrado: {path}")


def main() -> None:
    for path in (LEAF_DATASET, ASSET_DATASET, WEB_PACKAGE):
        assert_exists(path)

    leaf_header = set(read_header(LEAF_DATASET))
    missing_columns = REQUIRED_LEAF_COLUMNS - leaf_header
    if missing_columns:
        raise AssertionError(
            "Dataset de folhas sem colunas obrigatorias: "
            + ", ".join(sorted(missing_columns))
        )

    row_count = count_rows(LEAF_DATASET)
    if row_count < 100:
        raise AssertionError(
            f"Dataset de folhas pequeno demais para smoke test: {row_count} linhas"
        )

    print("Smoke data contract OK")
    print(f"Leaf dataset rows: {row_count}")
    print(f"Asset dataset: {ASSET_DATASET.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
