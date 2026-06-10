# HackCafe Agent Rules

## Objetivo do Produto

HackCafe evolui para uma plataforma de decisao para cafeicultura de montanha, unindo:

- HackCafe: IoT, dashboard operacional, analise visual de folhas/frutos e arquitetura de campo.
- CafAI: previsao de produtividade e agente de recomendacoes agronomicas.

Toda entrega deve preservar a cadeia: hipotese -> evidencia -> decisao -> oportunidade -> requisito/story -> criterio de aceite -> metrica.

## Como Trabalhar

- Sincronize cedo: `git fetch --all --prune`, confira `git status --short --branch` e trabalhe em branch curta no padrao Conventional Commits.
- Prefira fatias pequenas com prova observavel: UI navegavel, comando de teste, screenshot, log ou CI verde.
- Nunca commite segredos, chaves de API, tokens, dumps privados ou credenciais de fazenda/produtor.
- Trate dados agronomicos e imagens como sensiveis quando vierem de produtores reais.
- Use portugues do Brasil na experiencia de usuario e documentacao de produto.
- Ao criar feature web, use Node 22 com pnpm 11.3.0 e rode no minimo `pnpm install --frozen-lockfile`, `pnpm run typecheck`, `pnpm run lint` e `pnpm run build` dentro de `plataforma-web`.
- Ao mexer em dados/modelos Python, rode `python tests/smoke_data_contract.py` e documente o limite do que o smoke test prova.

## Guardrail de Frontend

- Preserve o frontend atual do HackCafe como identidade visual principal do produto.
- Nao redesenhe a navegacao, paleta, densidade, hierarquia visual, componentes base ou tom da interface sem decisao explicita do maintainer.
- Novas capacidades vindas do CafAI devem entrar como extensoes incrementais dentro da experiencia existente, reutilizando os padroes de `plataforma-web/`.
- Quando houver duvida entre criar uma UI nova e encaixar no visual atual, escolha encaixar no visual atual.
- Mudancas visuais relevantes precisam declarar o que foi preservado, o que mudou e por que a mudanca nao descaracteriza o HackCafe.

## Pilhas e Fronteiras

- `plataforma-web/`: Next.js, React, TypeScript, Tailwind e componentes shadcn/Radix.
- `analise-preditiva/` ou `análise-preditiva/`: detecao visual e experimentos Python.
- `dispositivo-iot/`: firmware e contrato de sensores.
- `documentos/`: decisao de produto, arquitetura, backlog, rastreabilidade e handoffs.

Use adaptadores/contratos claros quando ligar Python/ML ao Next.js. Evite acoplar notebook, pickle ou script interativo diretamente a componente React.

## Devin e Codex

- Use Codex como orquestrador, integrador e revisor final.
- Use Devin Cloud para tarefas paralelizaveis com escopo claro: implementacao de fatias, pesquisa de arquitetura, testes, refatoracoes, PR review e exploracao de modelo.
- Quando a conta disponibilizar modo ULTRA/mythical, solicite esse modo em tarefas complexas ou de alto impacto.
- Para tarefas locais rapidas, Devin CLI pode ser usado como agente auxiliar; para tarefas longas, prefira Devin Cloud com VM dedicada.
- Todo prompt para Devin deve conter: contexto, branch/base, arquivos relevantes, restricoes, comandos de verificacao, criterios de aceite e formato de entrega.

## Definition of Done

- Codigo/documentacao versionados em branch publicada.
- CI ou cama de teste minima executada com evidencia.
- PR aberto ou identificador remoto informado.
- Riscos e proximas decisoes registrados quando a entrega for uma fatia de produto.
