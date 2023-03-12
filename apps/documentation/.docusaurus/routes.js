import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'cb5'),
    exact: true,
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '27b'),
    exact: true,
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', 'e18'),
    exact: true,
  },
  {
    path: '/blog/tags/general',
    component: ComponentCreator('/blog/tags/general', '903'),
    exact: true,
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', '283'),
    exact: true,
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', 'b20'),
    exact: true,
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '687'),
    routes: [
      {
        path: '/docs/api-reference/checkin',
        component: ComponentCreator('/docs/api-reference/checkin', 'e17'),
        exact: true,
        sidebar: 'tutorialSidebar',
      },
      {
        path: '/docs/api-reference/email',
        component: ComponentCreator('/docs/api-reference/email', 'eac'),
        exact: true,
        sidebar: 'tutorialSidebar',
      },
      {
        path: '/docs/api-reference/slack',
        component: ComponentCreator('/docs/api-reference/slack', 'c7a'),
        exact: true,
        sidebar: 'tutorialSidebar',
      },
      {
        path: '/docs/getting-started/Installation and Setup',
        component: ComponentCreator('/docs/getting-started/Installation and Setup', 'e0b'),
        exact: true,
        sidebar: 'tutorialSidebar',
      },
      {
        path: '/docs/getting-started/portal',
        component: ComponentCreator('/docs/getting-started/portal', 'bd0'),
        exact: true,
        sidebar: 'tutorialSidebar',
      },
      {
        path: '/docs/getting-started/serverless-api',
        component: ComponentCreator('/docs/getting-started/serverless-api', '52e'),
        exact: true,
        sidebar: 'tutorialSidebar',
      },
      {
        path: '/docs/getting-started/serverless-service',
        component: ComponentCreator('/docs/getting-started/serverless-service', '783'),
        exact: true,
        sidebar: 'tutorialSidebar',
      },
      {
        path: '/docs/guides/graphql/dependency-injection',
        component: ComponentCreator('/docs/guides/graphql/dependency-injection', '797'),
        exact: true,
        sidebar: 'tutorialSidebar',
      },
      {
        path: '/docs/guides/graphql/extending',
        component: ComponentCreator('/docs/guides/graphql/extending', '8f4'),
        exact: true,
        sidebar: 'tutorialSidebar',
      },
      {
        path: '/docs/guides/graphql/typegraphql-prisma',
        component: ComponentCreator('/docs/guides/graphql/typegraphql-prisma', 'c64'),
        exact: true,
        sidebar: 'tutorialSidebar',
      },
      {
        path: '/docs/guides/monorepo/build-tools',
        component: ComponentCreator('/docs/guides/monorepo/build-tools', '272'),
        exact: true,
        sidebar: 'tutorialSidebar',
      },
      {
        path: '/docs/guides/monorepo/configurations',
        component: ComponentCreator('/docs/guides/monorepo/configurations', 'd22'),
        exact: true,
        sidebar: 'tutorialSidebar',
      },
      {
        path: '/docs/guides/monorepo/npm-workspaces',
        component: ComponentCreator('/docs/guides/monorepo/npm-workspaces', '686'),
        exact: true,
        sidebar: 'tutorialSidebar',
      },
      {
        path: '/docs/guides/ui components/ACMButton',
        component: ComponentCreator('/docs/guides/ui components/ACMButton', 'c09'),
        exact: true,
        sidebar: 'tutorialSidebar',
      },
      {
        path: '/docs/guides/ui components/create-new-components',
        component: ComponentCreator('/docs/guides/ui components/create-new-components', '948'),
        exact: true,
        sidebar: 'tutorialSidebar',
      },
      {
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro', 'aed'),
        exact: true,
        sidebar: 'tutorialSidebar',
      },
      {
        path: '/docs/principles-architecture/architecture',
        component: ComponentCreator('/docs/principles-architecture/architecture', 'f00'),
        exact: true,
        sidebar: 'tutorialSidebar',
      },
      {
        path: '/docs/resources',
        component: ComponentCreator('/docs/resources', '8be'),
        exact: true,
        sidebar: 'tutorialSidebar',
      },
    ],
  },
  {
    path: '/',
    component: ComponentCreator('/', '39e'),
    exact: true,
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
