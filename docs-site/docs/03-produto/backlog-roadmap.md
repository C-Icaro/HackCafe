---
title: Backlog e Roadmap
---

# Backlog e roadmap rastreavel

## Roadmap de impacto

| Horizonte | Resultado esperado | Entrega principal | Evidencia de aceite |
| --- | --- | --- | --- |
| Agora | Demo de portfolio coerente | Plataforma HackCafe + discovery Docusaurus + CI | Deploy navegavel, docs buildando e PR com checks |
| Sprint 1 | Decisao por talhao | Fila de prioridades conectada a sensores, imagem e previsao | Usuario identifica talhao prioritario em ate 1 minuto |
| Sprint 2 | IA visual validavel | Pipeline BRACOL/BRACOT com metricas e exemplos | Macro-F1/mAP reportados e limite do modelo documentado |
| Sprint 3 | Previsao economica | Produtividade + preco + custo em cenarios | Simulacao mostra impacto financeiro por acao |
| Sprint 4 | Rastreabilidade | Historico exportavel por talhao/lote | Pacote de evidencias completo para cooperativa |

## Backlog rastreavel

| ID | Prioridade | Hipotese | Evidencia/Fonte | Decisao | Oportunidade | Story | Criterio de aceite | Metrica |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| H1-E1-D1-O1-S1 | P0 | Decisao priorizada e mais valiosa que grafico isolado. | Dores de clima, praga, custo e tempo aparecem juntas em Conab, USDA/FAS e Embrapa. | A experiencia deve abrir em fila de talhoes por risco. | Central de prioridade por talhao. | Como produtor, quero uma fila de talhoes por risco para agir primeiro onde importa. | Lista mostra risco, impacto, evidencia, confianca e proxima acao. | Tempo ate decisao menor que 1 minuto. |
| H2-E2-D2-O2-S2 | P0 | A documentacao aumenta confianca de portfolio. | Projeto une hackathon, HackCafe, CafAI, ML, IoT, CI/CD e deploy. | Publicar discovery navegavel em Docusaurus. | Narrativa de produto auditavel. | Como visitante, quero entender a dor, a solucao e o roadmap rapidamente. | Docusaurus publica discovery, fontes, backlog e validacao. | Visitante entende proposta em ate 90 segundos. |
| H3-E3-D3-O3-S3 | P0 | CI reduz risco de agentes paralelos. | Projeto ja possui web build e smoke tests de dados. | Docs devem virar check obrigatorio de build. | Governanca de entrega continua. | Como maintainer, quero docs buildando no GitHub Actions. | Job Docusaurus instala, typechecka e builda. | PR com todos os checks verdes. |
| H4-E4-D4-O4-S4 | P1 | IA visual gera valor como triagem. | Embrapa mostra perdas por pragas/doencas; BRACOL oferece baseline publico. | Posicionar IA visual como apoio com incerteza, nao prescricao autonoma. | Triagem visual contextual. | Como tecnico, quero classificar imagem com severidade e incerteza. | Resultado mostra classe, severidade, confianca, evidencia e limite. | Macro-F1 por classe e exemplos de erro. |
| H5-E5-D5-O5-S5 | P1 | Previsao de safra precisa virar decisao economica. | Conab, USDA/FAS e World Bank apontam impacto de clima, especie, bienalidade e preco. | Conectar produtividade a receita, custo e margem. | Previsao economica por talhao. | Como produtor, quero simular sacas e receita por talhao. | Cenario conservador/base/otimista com variaveis usadas. | Erro medio documentado e decisao compreendida. |
| H6-E6-D6-O6-S6 | P1 | Registro operacional pode virar rastreabilidade. | European Commission, CBI e SCA apontam exigencia de origem, geolocalizacao e due diligence. | Gerar historico exportavel a partir do uso diario. | Rastreabilidade operacional. | Como cooperativa, quero exportar historico por lote/talhao. | Export contem area, periodo, eventos, imagens, acoes e responsaveis. | Percentual de evidencias completas por lote. |
| H7-E7-D7-O7-S7 | P2 | Colheita de montanha precisa de timing melhor. | Embrapa aponta custo e dificuldade de mao de obra em relevo de montanha. | Usar maturacao, risco e equipe para ordenar colheita. | Planejamento de colheita. | Como produtor, quero priorizar colheita por maturacao, risco e equipe. | Cronograma recomenda ordem de talhoes e justificativa. | Reducao estimada de perda/custo por talhao. |
| H8-E8-D8-O8-S8 | P2 | Tecnico precisa acompanhar carteira. | A jornada secundaria envolve varios produtores e casos incompletos. | Criar painel de triagem para tecnico/cooperativa. | Carteira tecnica priorizada. | Como tecnico, quero ver casos por urgencia e produtor. | Painel filtra risco, atraso, evidencia incompleta e visita. | Tempo medio de triagem por caso. |

## Historias candidatas para Devin/Colab

| Agente | Tarefa paralelizavel | Entrega esperada |
| --- | --- | --- |
| Devin Cloud ULTRA | Implementar fila de decisao por talhao sem redesenhar o frontend. | PR com componentes encaixados no visual atual, testes e screenshot. |
| Devin Cloud ULTRA | Revisar arquitetura de API Python para modelo CafAI + visão. | ADR com contrato, riscos e plano incremental. |
| Google Colab | Treinar baseline BRACOL completo com GPU. | Notebook, metricas, matriz de confusao e artefatos versionaveis. |
| Devin Cloud | Converter pesquisa de entrevistas em stories e criterios. | Atualizacao do Docusaurus com rastreabilidade. |

## Proxima decisao

Escolher entre duas fatias:

1. **Produto:** implementar fila real de prioridades por talhao na plataforma.
2. **ML:** treinar baseline de visao em Colab e publicar metricas de validacao.

Para portfolio, a recomendacao e fazer a fila primeiro e usar o modelo como evidencia incremental.
