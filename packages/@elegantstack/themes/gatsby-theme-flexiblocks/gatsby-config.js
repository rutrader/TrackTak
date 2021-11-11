module.exports = options => {
  const { createDemoPages } = options

  const plugins = [
    {
      resolve: '@elegantstack/gatsby-blocks-core',
      options
    },
    '@elegantstack/gatsby-blocks-helpers',
    '@elegantstack/gatsby-common-helpers',
    {
      resolve: '@elegantstack/solid-ui-theme',
      options
    },
    '@elegantstack/solid-ui-layout',
    '@elegantstack/solid-ui-components',
    '@elegantstack/solid-ui-blocks'
  ]

  if (createDemoPages === true) {
    plugins.push({
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `${__dirname}/src`
      }
    })
  }

  return { plugins }
}
