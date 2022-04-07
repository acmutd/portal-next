// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ACM Portal',
  tagline: 'Learn more about the ACM Portal, microservices, and core infrastructure',
  url: 'https://docs.portal.acmutd.co',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'ACM', // Usually your GitHub org/user name.
  projectName: 'portal-next', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/acmutstartd/docs-leadership/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/acmutd/docs-leadership/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Portal',
        logo: {
          alt: 'Logo',
          src: 'img/logo-black.svg',
          srcDark: 'img/logo-white.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/acmutd/portal-next',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Portal',
            items: [
              {
                label: 'Docs',
                to: '/docs/intro',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
            ],
          },
          {
            title: 'Social',
            items: [
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/27182339',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/acmutd',
              },
              {
                label: 'Instagram',
                href: 'https://instagram.com/acmutd',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/acmutd',
              },
              {
                label: 'Discord',
                href: 'https://acmutd.co/discord',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Leadership Site',
                href: 'https://leadership.acmutd.co',
              },
              {
                label: 'ACM Website',
                href: 'https://acmutd.co',
              },
              {
                label: 'ACM Portal',
                href: 'https://portal.acmutd.co',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ACM Portal. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
