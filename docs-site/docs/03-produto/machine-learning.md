---
title: Machine Learning no HackCafe
---

# Machine Learning no HackCafe

O HackCafe usa Machine Learning como camada de interpretacao entre sinais de campo e decisao operacional. Sensores, imagens de folhas/frutos, historico de safra e variaveis de manejo entram como dados; modelos de ML transformam esses dados em suspeitas, previsoes, riscos e prioridades.

O objetivo nao e substituir o produtor ou o tecnico. O objetivo e reduzir incerteza: indicar o que merece atencao, explicar qual evidencia sustentou o alerta e registrar o resultado para melhorar a proxima safra.

## Onde o ML entra no produto

| Bloco do HackCafe | Entrada | Saida esperada | Tipo de aprendizado |
| --- | --- | --- | --- |
| Visao computacional | Fotos de folhas, frutos ou talhoes | Classe provavel, severidade, confianca e exemplos visuais | Redes neurais convolucionais, YOLO ou classificadores de imagem |
| Previsao de produtividade | Clima, solo, variedade, idade, manejo, historico e sensores | Estimativa de sacas, risco e cenarios | Regressao, arvores, MLP ou modelos tabulares |
| Priorizacao de talhoes | Risco visual, sensor, previsao e impacto economico | Lista ordenada de acoes | Modelo de scoring supervisionado ou regras calibradas |
| Rastreabilidade inteligente | Eventos, imagens, leituras, decisoes e responsaveis | Historico auditavel e alertas de evidencia faltante | Classificacao de completude, deteccao de anomalia e regras |

## Do perceptron ao produto

O perceptron e a unidade conceitual mais simples de uma rede neural. Ele recebe entradas numericas, atribui um peso a cada uma, soma tudo com um viés e passa o resultado por uma funcao de ativacao.

Em linguagem de produto:

| Conceito | Exemplo no HackCafe |
| --- | --- |
| Entrada | Umidade, temperatura, pH, indice de folha, chuva recente ou pixel de uma imagem |
| Peso | Quanto aquela entrada influencia o risco ou a previsao |
| Vies | Ajuste base do modelo antes de considerar os sinais |
| Ativacao | Transformacao que decide se o sinal e fraco, moderado ou forte |
| Saida | Classe, risco, probabilidade, severidade ou estimativa numerica |

Um perceptron isolado consegue separar problemas simples, quase lineares. Por exemplo: se alta umidade e temperatura em certa faixa aumentam risco de doenca, um perceptron poderia aprender uma fronteira simples entre "risco baixo" e "risco alto".

Mas a lavoura nao se comporta de forma tao simples. Uma folha pode parecer saudavel sob uma iluminacao e doente sob outra; seca pode reduzir produtividade de maneiras diferentes conforme variedade, fase fenologica e historico; preco alto pode mudar a decisao economica mesmo com risco agronomico parecido. Por isso o projeto precisa de redes neurais multi camadas e modelos mais ricos.

## Redes neurais multi camadas

Uma rede neural multi camada, ou MLP, empilha varios perceptrons em camadas:

| Camada | Papel |
| --- | --- |
| Entrada | Recebe os dados brutos ou atributos preparados |
| Camadas ocultas | Aprendem combinacoes intermediarias dos sinais |
| Saida | Entrega classe, probabilidade, score de risco ou valor previsto |

No HackCafe, uma MLP pode ser usada para dados tabulares de safra. Exemplo: temperatura media, umidade, pH, altitude, idade da lavoura, variedade, chuva acumulada e historico de produtividade podem entrar na rede. As camadas ocultas aprendem relacoes nao lineares, como "umidade alta so vira risco forte quando combinada com temperatura e fase especifica da planta". A saida pode ser produtividade estimada ou risco por talhao.

## Visao computacional e redes profundas

Imagens exigem outro tipo de rede. Em vez de entregar manualmente "mancha", "borda" ou "cor", redes convolucionais aprendem padroes visuais em camadas:

| Nivel aprendido | Exemplo em folha de cafe |
| --- | --- |
| Baixo nivel | Bordas, contraste, textura e cor |
| Nivel intermediario | Manchas, pontos, nervuras, regioes danificadas |
| Alto nivel | Ferrugem, bicho-mineiro, cercospora, folha saudavel ou padrao inconclusivo |

Modelos da familia YOLO adicionam uma camada de deteccao: alem de classificar, eles podem localizar regioes na imagem. Para o HackCafe isso e util quando a pergunta for "onde esta o sintoma?". Para o BRACOL local, que tem rotulo por imagem, a primeira trilha mais honesta e classificacao de folha inteira. Para deteccao de sintomas, precisamos de datasets com caixas ou mascaras, como BRACOT ou uma derivacao YOLO auditada.

## Estado atual do modelo

O repositorio possui `yolov8n.pt`, mas esse peso e um detector generico treinado no COCO. Ele reconhece classes como pessoa, carro, passaro, pipa e maca; nao reconhece nativamente `healthy`, `leaf_miner`, `leaf_rust`, `brown_leaf_spot_or_phoma` ou `cercospora`.

Decisao: o peso atual pode demonstrar carregamento de modelo e inferencia, mas nao deve ser usado para comunicar precisao, recall, F1 ou recomendacao agronomica de doencas de cafe.

Para que o ML seja valido no produto, a proxima etapa e treinar ou integrar um modelo com classes alinhadas ao problema:

1. Preparar o BRACOL em formato de classificacao.
2. Treinar baseline `yolo11n-cls` ou `yolo11s-cls` em Colab/Devin Cloud.
3. Medir accuracy, precision, recall, F1 macro, F1 ponderado e matriz de confusao.
4. Validar generalizacao em datasets externos antes de afirmar robustez em campo.
5. Exibir no produto a confianca, o limite do modelo e a necessidade de validacao tecnica.

## Como a decisao fica rastreavel

| Etapa | Registro |
| --- | --- |
| Hipotese | ML aumenta valor do HackCafe se transformar sinais de campo em decisao priorizada. |
| Evidencia | BRACOL oferece rotulos de estresse em folhas; sensores e historico podem alimentar previsao; o peso atual YOLO nao tem classes de cafe. |
| Decisao | Usar ML como triagem e previsao assistiva, nao como prescricao agronomica autonoma. |
| Oportunidade | Criar baseline validavel de classificacao de folhas e previsao de produtividade por talhao. |
| Story | Como tecnico, quero ver classe provavel, confianca, evidencia e limite do modelo antes de orientar manejo. |
| Criterio de aceite | Modelo treinado em classes de cafe reporta precision, recall, F1 e matriz de confusao no split de teste. |
| Metrica | Macro-F1 por classe, recall de classes criticas, taxa de falsos positivos e tempo ate decisao do usuario. |

## Como isso aparece para o usuario

O usuario nao precisa ver "perceptron" na interface. Ele precisa ver decisao clara:

- talhao com maior risco;
- imagem ou sensor que gerou o alerta;
- classe provavel e confianca;
- limite do modelo;
- acao sugerida para validar em campo;
- historico do que foi feito e do resultado observado.

Assim, a sofisticacao tecnica fica a servico da experiencia: redes neurais aprendem padroes, mas o produto entrega prioridade, evidencia e proxima decisao.
