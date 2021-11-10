module.exports = {
  plugins: [
    {
      resolve: '@elegantstack/gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@solid-ui-blocks': '@elegantstack/solid-ui-blocks/src',
        },
        extensions: ['js', 'jsx'],
      },
    },
  ],
}
