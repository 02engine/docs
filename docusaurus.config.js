/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: '02Engine Documentation',
  url: 'https://docs.02engine.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  organizationName: '02Engine',
  projectName: 'docs',
  trailingSlash: false,
  themeConfig: {
    navbar: {
      title: '02Engine Documentation',
      items: [
        {
          href: '/packager/',
          label: 'Packager',
          position: 'left'
        },
        {
          href: '/development/',
          label: 'Development',
          position: 'left'
        },
        {
          href: 'https://02engine.org/',
          label: '02Engine',
          position: 'right'
        },
        {
          href: 'https://github.com/02Engine',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    algolia: {
      // This is all supposed to be public
      appId: 'HORQ9E5CCA',
      apiKey: 'c3873ce4208edb896a31bb3e7c2cbdad',
      indexName: '02Engine'
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: require('./code-themes/light'),
      darkTheme: require('./code-themes/dark'),
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          breadcrumbs: false,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
