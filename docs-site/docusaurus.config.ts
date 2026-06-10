import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const siteUrl = process.env.DOCS_SITE_URL ?? 'https://hackcafe-discovery.vercel.app';
const baseUrl = process.env.DOCS_BASE_URL ?? '/';

const config: Config = {
  title: 'HackCafe Discovery',
  tagline: 'Inteligencia de decisao para a cafeicultura de montanha',
  url: siteUrl,
  baseUrl,
  organizationName: 'C-Icaro',
  projectName: 'HackCafe',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'HackCafe Discovery',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'discoverySidebar',
          position: 'left',
          label: 'Discovery',
        },
        {
          href: 'https://github.com/C-Icaro/HackCafe',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://plataforma-web-ashy.vercel.app',
          label: 'Demo',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Projeto',
          items: [
            {
              label: 'Repositorio',
              href: 'https://github.com/C-Icaro/HackCafe',
            },
            {
              label: 'Aplicacao web',
              href: 'https://plataforma-web-ashy.vercel.app',
            },
          ],
        },
        {
          title: 'Pesquisa',
          items: [
            {
              label: 'Fontes',
              to: '/referencias/fontes',
            },
            {
              label: 'Plano de validacao',
              to: '/validacao/plano-validacao',
            },
          ],
        },
      ],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
