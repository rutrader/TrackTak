module.exports = {
  plugins: [
    {
      resolve: '@elegantstack/gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@blocks-helpers': '@elegantstack/gatsby-blocks-helpers/src'
        },
        extensions: ['js', 'jsx']
      }
    }
  ]
}
