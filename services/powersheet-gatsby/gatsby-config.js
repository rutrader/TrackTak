module.exports = {
  flags: {
    DEV_SSR: false
  },
  plugins: [
    {
      resolve: '@elegantstack/gatsby-theme-flexiblocks',
      options: {
        createDemoPages: false,
        colorMode: false
      }
    }
  ],
  siteMetadata: {
    title: 'Powersheet By Tracktak',
    name: 'Powersheet',
    description:
      'A lightning fast spreadsheet with formula support for businesses.'
  }
}
