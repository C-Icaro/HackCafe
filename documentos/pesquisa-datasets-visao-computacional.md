# Pesquisa de Datasets Publicos para Visao Computacional

## Sintese

A melhor primeira decisao para o HackCafe e usar o BRACOL local como baseline de classificacao/severidade e, em seguida, iterar para deteccao de sintomas com BRACOT ou derivados YOLO do BRACOL. Datasets maiores como JMuBEN/JMuBEN2 entram como pretreinamento e validacao cruzada, nao como substitutos imediatos, porque o produto precisa de confiabilidade em campo e rastreabilidade das classes.

## Fatos

- O repositorio ja contem parte do BRACOL em `análise-preditiva/coffee-datasets/leaf`, com `dataset.csv` e imagens.
- O BRACOL tem 1747 imagens de folhas Arabica, rotulos de estresse predominante e severidade, e licenca CC BY 4.0.
- O checkout atual tem 1747 linhas no CSV e 1402 arquivos JPG; o dry-run do preparo usa 1343 imagens nao inconclusivas e reporta 342 imagens ausentes.
- O BRACOT complementa o BRACOL com 300 imagens em campo e 1662 instancias anotadas em VIA.
- O artigo recente de YOLO em folhas de cafe comparou YOLOv8, YOLOv9, YOLOv10 e YOLOv11 em BRACOL e destacou YOLOv8s como uma boa troca entre mAP e latencia.
- Devin Cloud e Google Colab devem ser usados para treinos longos; localmente devemos manter apenas smoke tests e scripts reprodutiveis.

## Hipoteses

- Um classificador BRACOL bem avaliado ja cria valor de portfolio porque fecha a cadeia sensor -> imagem -> diagnostico -> decisao.
- Modelos de deteccao/localizacao serao mais convincentes para demonstracao visual, mas exigem conversao e auditoria de anotacoes.
- Dataset grande com imagens aumentadas pode inflar acuracia; por isso a validacao externa e mais importante que uma acuracia alta em split aleatorio.

## Decisao

1. Usar BRACOL como dataset primario imediato.
2. Criar baseline no Google Colab com classificacao de estresse predominante e severidade, reportando explicitamente imagens ausentes no checkout.
3. Usar BRACOT/BRACOL-YOLO/Roboflow como candidatos para deteccao YOLO depois de validar licenca e anotacoes.
4. Usar RoCoLe, JMuBEN/JMuBEN2 e Uganda Coffee Leaf como validacao externa e pretreinamento.
5. Nao comunicar o modelo como recomendacao agronomica real antes de validacao por dominio e dados de campo.

## Ranking

| Tier | Dataset | Uso no HackCafe | Por que entra |
| --- | --- | --- | --- |
| A | BRACOL | Baseline imediato de classificacao/severidade | Brasil, Arabica, ja versionado, classes alinhadas |
| A | BRACOT | Deteccao/segmentacao em campo | Fotos de planta real, instancia, complementar ao BRACOL |
| A- | BRACOL for YOLO Detection | Benchmark rapido YOLO | Atalho para deteccao, mas precisa auditoria de derivacao |
| B+ | Roboflow Coffee Leaf Diseases | Experimento rapido/API | Classes alinhadas e CC BY 4.0, mas descricao limitada |
| B+ | JMuBEN/JMuBEN2 | Pretreinamento classificatorio | Volume alto e CC BY 4.0, mas cropped/augmented |
| B | RoCoLe | Validacao externa de ferrugem/severidade | Robusta, rust/mites, severidade |
| B | Uganda Coffee Leaf | Validacao externa recente | Smartphone, rust/phoma/healthy |
| C+ | Coffee Fruit Maturity | Futuro modulo de maturacao | Bom para colheita, nao para diagnostico de folhas |

## Cama de Teste Minima

- `python tests/smoke_cv_dataset_manifest.py` garante que a matriz de datasets segue estrutura minima.
- `python análise-preditiva/prepare_bracol_classification.py --dry-run` valida que o dataset local pode virar formato de classificacao sem copiar imagens.
- No Colab: preparar BRACOL, treinar baseline curto, registrar imagens usadas/ausentes, matriz de confusao, accuracy/F1 por classe, latencia e artefato `best.pt`.

## Plano de Iteracao

### Sprint ML 0 - Baseline Local/Colab

- Preparar BRACOL em formato Ultralytics classification.
- Se a meta for treino de producao, baixar/validar o BRACOL completo via Mendeley antes de treinar.
- Treinar `yolo11n-cls` ou `yolo11s-cls` por 20-40 epocas no Colab.
- Medir accuracy, macro-F1, matriz de confusao e latencia.
- Criterio de aceite: notebook reproduzivel e metricas exportadas.

### Sprint ML 1 - Deteccao de Sintomas

- Converter BRACOT VIA para COCO/YOLO ou usar BRACOL-YOLO como benchmark auditado.
- Treinar YOLOv8s/YOLO11s; se houver GPU forte, testar variantes medias.
- Criterio de aceite: mAP50 por classe e exemplos visuais com falsos positivos comentados.

### Sprint ML 2 - Validacao Externa

- Rodar inference nos datasets RoCoLe, Uganda e JMuBEN/JMuBEN2.
- Separar queda de desempenho por dominio: pais, especie, fundo, iluminacao e tipo de rotulo.
- Criterio de aceite: relatorio de generalizacao com decisao de coletar dados proprios ou ajustar dominio.

## Fontes

- BRACOL: https://data.mendeley.com/datasets/yy2k5y8mxg/1
- BRACOT: https://data.mendeley.com/datasets/pmkbyjpf6k/1
- RoCoLe: https://data.mendeley.com/datasets/c5yvn32dzg/2
- JMuBEN: https://data.mendeley.com/datasets/t2r6rszp5c/1
- JMuBEN2: https://data.mendeley.com/datasets/tgv3zb82nd/1
- Uganda Coffee Leaf Diseases: https://data.mendeley.com/datasets/k36wnd6knb/1
- Roboflow Coffee leaf diseases classification: https://universe.roboflow.com/data6000-y6w94/coffee-leaf-diseases-classification
- BRACOL for YOLO Detection: https://www.kaggle.com/datasets/jonatanfragoso/bracol-for-yolov8-detection
- Coffee Fruit Maturity: https://www.kaggle.com/datasets/cienciacafeto/coffee-fruit-maturity
- Ultralytics train/classify/detect docs: https://docs.ultralytics.com/modes/train
