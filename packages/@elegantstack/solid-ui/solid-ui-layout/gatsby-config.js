module.exports = {
  plugins: [
    {
      resolve: '@elegantstack/gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@solid-ui-layout': '@elegantstack/solid-ui-layout/src'
        },
        extensions: ['js', 'jsx']
      }
    }
  ]
}
