module.exports = {
  sidebar: [
    'intro',
    {
      type: 'category',
      label: '02Engine Editor',
      collapsed: false,
      items: [
        'website/new-ui',
        'website/editor-windows',
        'website/extension-library',
        'website/background-settings',
        'website/extension-debugger',
        'website/direct-javascript-coding',
        'website/return',
        'website/custom-default-project',
        'website/custom-addon',
        'website/opf',
        'website/convert-cli'
      ]
    },
    {
      type: 'category',
      label: 'Advanced Settings',
      collapsed: false,
      items: [
        'website/settings/overview',
        'website/settings/custom-fps',
        'website/settings/interpolation',
        'website/settings/high-quality-pen',
        'website/settings/remove-fencing',
        'website/settings/remove-misc-limits',
        'website/settings/infinite-clones',
        'website/settings/warp-timer',
        'website/settings/custom-stage-size',
        'website/settings/disable-compiler'
      ]
    },
    {
      type: 'category',
      label: 'Compatibility and Web',
      collapsed: false,
      items: [
        'website/unshared-projects',
        'website/cloud-variables',
        'website/new-compiler',
        'website/embedding',
        'website/how-it-works',
        'website/javascript',
        'website/cors',
        'website/turbowarp-blocks',
        'website/url-parameters',
        'website/scratch-accounts',
        'website/translate',
        'website/donate'
      ]
    }
  ],
  development: [
    'development/home',
    'development/getting-started',
    'development/architecture',
    'development/addons',
    {
      type: 'category',
      label: 'Custom Extension Tutorial',
      collapsed: false,
      items: [
        'development/extensions/introduction',
        'development/extensions/hello-world',
        'development/extensions/inputs',
        'development/extensions/async',
        'development/extensions/sandbox',
        'development/extensions/unsandboxed',
        'development/extensions/better-development-server',
        'development/extensions/assorted-apis',
        'development/extensions/hats',
        'development/extensions/compatibility',
        'development/extensions/share',
        'development/extensions/wrapping-up'
      ]
    },
    'development/globals',
    'development/scratchx'
  ],
  packager: [
    'packager/home',
    'packager/embedding',
    'packager/commercial-use',
    'packager/dynamic-stage-resize',
    'packager/special-cloud-behaviors',
    'packager/offline'
  ]
};
