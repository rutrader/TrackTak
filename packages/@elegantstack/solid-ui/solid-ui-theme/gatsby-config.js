const defaultFonts = require('./src/typography-fonts.json')

module.exports = options => {
  return {
    plugins: [
      {
        resolve: '@elegantstack/gatsby-plugin-alias-imports',
        options: {
          alias: {
            '@solid-ui-theme': '@elegantstack/solid-ui-theme/src'
          },
          extensions: ['js', 'jsx', 'json']
        }
      },
      `gatsby-plugin-emotion`,
      //Add preconnect to google fonts servers for performance
      {
        resolve: 'gatsby-plugin-preconnect',
        options: {
          domains: [
            'https://fonts.gstatic.com/',
            'https://fonts.googleapis.com/'
          ]
        }
      },
      {
        resolve: `gatsby-plugin-web-font-loader`,
        options: {
          ...((options && options.fonts) ||
            (defaultFonts && defaultFonts.fonts))
        }
      }
    ]
  }
}
