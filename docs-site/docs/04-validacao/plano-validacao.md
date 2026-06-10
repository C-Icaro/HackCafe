---
title: Plano de Validacao
---

# Plano de validacao

## Objetivo

Validar se produtores, tecnicos e cooperativas reconhecem valor em uma central de decisao por talhao antes de investir pesado em modelo ou automacao operacional.

## Hipoteses criticas

| Hipotese | Como testar | Sinal observavel | Criterio de decisao |
| --- | --- | --- | --- |
| Produtor prefere prioridade acionavel a dashboard de graficos. | Teste guiado com prototipo e 5 cenarios de talhao. | Usuario escolhe proxima acao sem explicacao adicional. | 4 de 5 participantes completam em ate 1 minuto. |
| Tecnico confia mais em IA com incerteza e evidencia. | Mostrar resultado de imagem com/sem contexto. | Tecnico aponta qual caso visitaria primeiro e por que. | Preferencia clara pelo resultado contextualizado. |
| Rastreabilidade tem valor se nasce do fluxo normal. | Simular exportacao de historico por lote. | Cooperativa identifica dados faltantes e aceita estrutura. | Lista de campos obrigatorios estabiliza apos 3 entrevistas. |
| Previsao de produtividade precisa conectar custo/preco. | Comparar tela de sacas vs tela com margem. | Produtor usa margem para justificar decisao. | Maioria relata ganho de clareza na versao economica. |

## Cama de teste minima

### Produto

- Rodar a plataforma web atual.
- Apresentar 3 casos: risco climatico, suspeita visual, decisao de colheita.
- Medir tempo ate decisao, duvidas, campos ausentes e confianca declarada.

### Documentacao

- `pnpm run typecheck` no `docs-site`.
- `pnpm run build` no `docs-site`.
- CI do GitHub Actions com job `Docusaurus docs build`.

### Dados e ML

- `python tests/smoke_data_contract.py`
- `python tests/smoke_cv_dataset_manifest.py`
- `python análise-preditiva/prepare_bracol_classification.py --dry-run`
- No Colab: treinar baseline, exportar metricas e registrar limite de generalizacao.

## Roteiro de entrevista

1. Conte como decide qual talhao visitar primeiro em semana critica.
2. Que sinais fazem voce agir imediatamente?
3. Quando uma foto de folha ajuda e quando atrapalha?
4. Como voce registra manejo, praga, clima e resultado?
5. O que cooperativa/comprador pede que da mais trabalho comprovar?
6. Qual decisao custou caro na ultima safra?
7. O que uma IA teria que mostrar para voce confiar nela?

## Metricas de aprendizado

| Metrica | Por que importa |
| --- | --- |
| Tempo ate decisao | Mede se a experiencia reduz carga cognitiva. |
| Taxa de acao registrada | Mede se recomendacao vira execucao. |
| Evidencia completa por talhao | Mede preparo para rastreabilidade. |
| Precisao/F1 por classe visual | Mede qualidade minima da triagem. |
| Erro de previsao de produtividade | Mede utilidade do modulo CafAI/HackCafe. |
| Confianca declarada do tecnico | Mede risco de IA parecer caixa-preta. |

## Decisoes apos validacao

- Se produtores nao entenderem a fila de prioridade, simplificar linguagem e reduzir variaveis.
- Se tecnicos rejeitarem IA visual sem prova local, priorizar coleta e validacao regional.
- Se cooperativas valorizarem rastreabilidade, transformar exportacao em modulo P1.
- Se margem for mais decisiva que produtividade, puxar preco/custo para o centro da experiencia.
