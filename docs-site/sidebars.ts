import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  discoverySidebar: [
    'intro',
    {
      type: 'category',
      label: 'Descoberta',
      items: [
        'descoberta/contexto-setor',
        'descoberta/dores-usuarios',
        'descoberta/personas-jornadas',
      ],
    },
    {
      type: 'category',
      label: 'Definicao',
      items: [
        'definicao/oportunidades',
        'definicao/proposta-valor',
      ],
    },
    {
      type: 'category',
      label: 'Produto',
      items: ['produto/backlog-roadmap', 'produto/machine-learning'],
    },
    {
      type: 'category',
      label: 'Validacao',
      items: ['validacao/plano-validacao'],
    },
    {
      type: 'category',
      label: 'Referencias',
      items: ['referencias/fontes'],
    },
  ],
};

export default sidebars;
