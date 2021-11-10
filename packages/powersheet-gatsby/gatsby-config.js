module.exports = {
  flags: {
    DEV_SSR: true
  },
  plugins: [
    {
      resolve: '@elegantstack/gatsby-theme-flexiblocks',
      options: {
        createDemoPages: false,
        colorMode: false
      }
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: 'powersheet.tracktak.com'
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
