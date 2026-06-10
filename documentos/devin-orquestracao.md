# Orquestracao com Devin

## Estado Atual

- Devin CLI nao estava instalado no PATH local no inicio desta fatia.
- GitHub CLI esta autenticado como `C-Icaro`.
- Nao havia `DEVIN_API_KEY` nem `DEVIN_ORG_ID` no ambiente local.
- O repositorio agora inclui `AGENTS.md`, perfis `.devin/agents`, skills `.devin/skills` e workflows GitHub para CI/delegacao.

## Configuracao Necessaria

1. Criar service user no Devin com papel Member.
2. Gerar API key com prefixo `cog_`.
3. Adicionar no GitHub Actions:
   - `DEVIN_API_KEY`
   - `DEVIN_ORG_ID`
4. Opcionalmente instalar Devin CLI no Windows:
   - `irm https://static.devin.ai/cli/setup.ps1 | iex`
   - Depois autenticar com `/login`.

## Uso Recomendado

- Codex abre fatias, prepara criterio de aceite e revisa o PR final.
- Devin Cloud executa tarefas longas ou paralelas em VM dedicada.
- Devin CLI ajuda em tarefas locais quando o ambiente ja esta pronto.
- Para trabalhos complexos, pedir explicitamente o modo mais potente disponivel na conta, incluindo ULTRA/mythical quando aparecer no seletor.

## Prompt Base para Devin Cloud

```text
Atue como engenheiro senior no projeto HackCafe.

Repositorio: https://github.com/C-Icaro/HackCafe
Branch/base: main
Leia AGENTS.md antes de editar.

Objetivo:
<descrever a fatia>

Contexto:
- HackCafe traz IoT, dashboard e analise visual.
- CafAI traz previsao de produtividade e sugestoes agronomicas.

Escopo:
- <arquivos/modulos esperados>

Nao fazer:
- Nao commitar segredos.
- Nao substituir contratos sem teste.
- Nao fazer refactor amplo fora da fatia.
- Nao redesenhar o frontend atual do HackCafe; preserve navegacao, paleta, densidade, hierarquia visual e componentes base.

Verificacao:
- usar Node 22 e pnpm 11.3.0
- pnpm install --frozen-lockfile em plataforma-web
- pnpm run typecheck em plataforma-web
- pnpm run lint em plataforma-web
- pnpm run build em plataforma-web
- python tests/smoke_data_contract.py na raiz

Criterios de aceite:
- <lista objetiva>

Entrega esperada:
- Abrir PR com resumo, evidencias de teste e riscos residuais.
```

## Filas Paralelas

- Frontend: evoluir a pagina Decisao IA e UX do dashboard.
- ML/Data: transformar CafAI em endpoint/contrato testavel.
- QA/Release: endurecer CI, smoke tests e PR review.
- Produto: atualizar README, storytelling de portfolio e metricas de impacto.
