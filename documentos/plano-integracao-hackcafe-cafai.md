# Plano de Integracao HackCafe + CafAI

## Sintese

A uniao das ideias deve posicionar o projeto como uma central de decisao para produtores de cafe de montanha: o HackCafe observa a lavoura por sensores e visao computacional; o CafAI transforma variaveis de safra em previsao de produtividade e recomendacoes.

## Fatos

- HackCafe possui plataforma Next.js, modulo de analise visual com YOLO, firmware IoT e documentacao de arquitetura.
- CafAI possui app Streamlit com previsao de produtividade por variaveis agronomicas e sugestoes ao produtor.
- O repositorio HackCafe esta em TypeScript e e o melhor candidato para a experiencia final de portfolio.

## Hipoteses

- Produtores valorizam mais uma recomendacao priorizada do que graficos isolados.
- A demonstracao de portfolio fica mais forte quando mostra uma cadeia completa: sensor -> diagnostico -> previsao -> plano de acao.
- O modelo real do CafAI pode entrar depois por API Python sem mudar a interface principal.

## Decisao Inicial

Transformar a plataforma web do HackCafe na vitrine principal e absorver o conceito do CafAI como "Decisao IA da Safra".

## Decisao de Experiencia

O frontend atual do HackCafe deve ser preservado como identidade visual principal. A integracao com CafAI deve encaixar previsao, recomendacoes e automacoes dentro da experiencia existente, sem redesenhar navegacao, paleta, densidade, hierarquia visual ou componentes base sem decisao explicita.

## Backlog Rastreavel

| Prioridade | Oportunidade | Story | Criterio de aceite | Metrica |
| --- | --- | --- | --- | --- |
| P0 | Unir dashboard e previsao | Como produtor, quero simular produtividade por talhao para decidir manejo | Pagina web calcula produtividade, risco e recomendacoes a partir de variaveis CafAI | Tempo ate recomendacao menor que 1 minuto |
| P0 | Criar base de entrega continua | Como maintainer, quero CI minimo para aceitar PRs de agentes | Typecheck, build e smoke de dados rodam no GitHub Actions | PR com checks verdes |
| P1 | Integrar modelo real | Como produtor, quero previsao baseada em modelo treinado | Endpoint Python recebe contrato de entrada e retorna previsao/sugestoes | Erro medio documentado em dataset de validacao |
| P1 | Automatizar PR review | Como maintainer, quero Devin revisando PRs sob demanda | Workflow cria sessao Devin com contexto do PR | Comentario/relatorio em ate 10 min |
| P2 | Evidenciar impacto | Como visitante do portfolio, quero entender valor e arquitetura rapidamente | README mostra demo, arquitetura, screenshots e metricas | Recrutador entende proposta em ate 90s |

## Cama de Teste Minima

- Web: `pnpm install --frozen-lockfile`, `pnpm run typecheck`, `pnpm run build`.
- Dados: `python tests/smoke_data_contract.py`.
- Limite: os checks provam contrato e compilacao; ainda nao provam acuracia agronomica nem funcionamento fisico do IoT.

## Proxima Decisao

Escolher se a proxima fatia deve priorizar API Python do modelo CafAI ou melhoria visual/publicacao da demo para portfolio.
