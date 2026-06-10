---
title: Oportunidades
---

# Oportunidades de produto

## Oportunidade 1: central de prioridade por talhao

**Hipotese:** o usuario ganha mais valor quando o HackCafe ordena riscos do que quando apenas mostra graficos.

**Evidencia:** clima e pragas variam por safra e regiao; produtores de montanha lidam com recurso limitado de tempo, mao de obra e margem.

**Decisao:** transformar sensores, imagem e previsao em uma lista de prioridade.

**Story:** como produtor, quero ver quais talhoes exigem atencao hoje para decidir vistoria, manejo ou espera.

**Criterio de aceite:** cada item mostra risco, evidencia, confianca, acao sugerida, responsavel e proxima medicao.

**Metrica:** tempo ate decisao menor que 1 minuto em teste guiado.

## Oportunidade 2: triagem visual com contexto agronomico

**Hipotese:** visao computacional so gera confianca se vier acompanhada de severidade, incerteza e historico.

**Evidencia:** pesquisas da Embrapa mostram impacto de pragas/doencas e custo de controle; datasets publicos como BRACOL permitem baseline, mas nao substituem validacao local.

**Decisao:** posicionar IA visual como triagem e apoio ao tecnico, nao como prescricao autonoma.

**Story:** como tecnico, quero receber imagem classificada com contexto de talhao para decidir se preciso visitar ou acompanhar.

**Criterio de aceite:** resultado inclui classe provavel, severidade, confianca, fatores ambientais e aviso de limite do modelo.

**Metrica:** reducao de retrabalho em triagem e macro-F1 documentado por classe no dataset de validacao.

## Oportunidade 3: previsao de produtividade e margem

**Hipotese:** unir HackCafe e CafAI fica mais forte quando previsao vira decisao economica.

**Evidencia:** relatórios de safra e mercado mostram impacto de clima, especie, bienalidade e preco.

**Decisao:** evoluir a previsao de produtividade para cenario de sacas, receita e risco.

**Story:** como produtor, quero simular produtividade e receita por talhao para priorizar investimento.

**Criterio de aceite:** sistema mostra cenario conservador/base/otimista, variaveis usadas e sensibilidade a preco.

**Metrica:** usuario identifica a decisao recomendada e a justificativa em ate 90 segundos.

## Oportunidade 4: rastreabilidade operacional

**Hipotese:** gerar rastreabilidade no fluxo de decisao reduz custo administrativo e melhora valor percebido por cooperativas.

**Evidencia:** regulacoes e compradores exigem evidencias de origem, geolocalizacao, legalidade e risco.

**Decisao:** cada alerta, foto, leitura e acao deve virar historico exportavel.

**Story:** como cooperativa, quero consultar evidencias por talhao e lote para responder compradores e auditorias.

**Criterio de aceite:** exportacao inclui origem, periodo, eventos, imagens, leituras, decisoes e responsaveis.

**Metrica:** percentual de lotes com evidencias completas antes da negociacao.

## Nao-oportunidades imediatas

- Criar uma rede social de produtores.
- Automatizar aplicacao de defensivos.
- Fazer certificacao completa sem parceiro especialista.
- Trocar o frontend atual por uma nova experiencia.

Essas escolhas mantem o foco em portfolio de alto impacto com entrega demonstravel.
