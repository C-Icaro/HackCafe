# Avaliacao de Qualidade do Modelo de Visao Computacional

Data da avaliacao: 10 de junho de 2026.

## Resumo executivo

O repositorio possui modelo `yolov8n.pt`, mas ele nao e um modelo treinado para doencas de cafe. Ele e um detector YOLO de objetos generico com 80 classes COCO, como `person`, `car`, `bird`, `kite` e `apple`.

Conclusao: **nao ha precisao, recall, F1 ou mAP validos para doencas de cafe no modelo atual**. Comunicar esses numeros como qualidade agronomica seria incorreto.

## Evidencia gerada

Arquivo versionado:

`documentos/evidencias/avaliacao-modelo-visao-yolov8n.json`

Comando:

```powershell
python análise-preditiva\evaluate_cv_model_quality.py --sample-size 24 --output documentos\evidencias\avaliacao-modelo-visao-yolov8n.json
```

## Resultado

| Item | Resultado |
| --- | --- |
| Modelo avaliado | `análise-preditiva/yolov8n.pt` |
| Tipo do modelo | `detect` |
| Classes do modelo | 80 classes COCO |
| Classes alvo BRACOL | `healthy`, `leaf_miner`, `leaf_rust`, `brown_leaf_spot_or_phoma`, `cercospora` |
| Sobreposicao entre classes | 0 |
| Split avaliado | `test` |
| Imagens no split de teste | 206 |
| Gate de qualidade | `not_evaluable` |

## Metricas de qualidade

| Metrica | Valor | Interpretacao |
| --- | --- | --- |
| Accuracy | `null` | Nao calculavel para este modelo/dataset. |
| Precision macro | `null` | Nao calculavel para este modelo/dataset. |
| Recall macro | `null` | Nao calculavel para este modelo/dataset. |
| F1 macro | `null` | Nao calculavel para este modelo/dataset. |
| Precision ponderada | `null` | Nao calculavel para este modelo/dataset. |
| Recall ponderado | `null` | Nao calculavel para este modelo/dataset. |
| F1 ponderado | `null` | Nao calculavel para este modelo/dataset. |
| Matriz de confusao | `null` | Exige classes de saida compativeis com BRACOL. |

## Smoke de inferencia

O avaliador rodou inferencia em 24 imagens do split de teste apenas para confirmar comportamento. Isso nao mede qualidade de doenca; mede compatibilidade pratica.

| Classe COCO detectada | Quantidade |
| --- | --- |
| `kite` | 7 |
| `bird` | 2 |
| `apple` | 2 |

Essa saida confirma que o peso atual esta operando no espaco semantico errado para o problema.

## Dataset local usado como referencia

| Item | Valor |
| --- | --- |
| Linhas no CSV BRACOL local | 1747 |
| Imagens utilizaveis | 1343 |
| Imagens ausentes no checkout | 342 |
| Classe excluida como inconclusiva/mista | `5` com 62 linhas |
| Treino | 938 imagens |
| Validacao | 199 imagens |
| Teste | 206 imagens |

Distribuicao do teste:

| Classe | Imagens |
| --- | ---: |
| `healthy` | 22 |
| `leaf_miner` | 39 |
| `leaf_rust` | 71 |
| `brown_leaf_spot_or_phoma` | 53 |
| `cercospora` | 21 |

## Cadeia de decisao

| Etapa | Registro |
| --- | --- |
| Hipotese | O peso atual poderia ter alguma utilidade mensuravel para triagem visual de cafe. |
| Evidencia | O modelo e `detect`, tem 80 classes COCO e zero sobreposicao com as classes BRACOL. |
| Decisao | Bloquear comunicacao de precision/recall/F1 de doencas para esse peso. |
| Oportunidade | Treinar um classificador BRACOL ou detector com anotacoes BRACOT/BRACOL-YOLO. |
| Story | Como maintainer, quero um avaliador que recuse metricas invalidas para nao inflar a demo. |
| Criterio de aceite | Script gera JSON com `quality_gate=not_evaluable` para o modelo atual e calcula metricas quando houver classificador compativel. |
| Metrica | Presenca de check `CV model quality smoke` no CI e evidencia JSON versionada. |

## Proxima acao recomendada

Treinar um baseline em Colab/Devin Cloud usando BRACOL em formato de classificacao:

```powershell
python análise-preditiva\prepare_bracol_classification.py --output runs\datasets\bracol_cls --mode copy
```

Depois treinar `yolo11n-cls` ou `yolo11s-cls` e reexecutar:

```powershell
python análise-preditiva\evaluate_cv_model_quality.py --model runs\train\bracol_cls\weights\best.pt
```

So apos esse passo sera correto reportar accuracy, precision, recall, F1 e matriz de confusao para doencas de cafe.
