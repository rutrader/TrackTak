module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: '@elegantstack/gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@solid-ui-components': '@elegantstack/solid-ui-components/src'
        },
        extensions: ['js', 'jsx']
      }
    }
  ]
}
