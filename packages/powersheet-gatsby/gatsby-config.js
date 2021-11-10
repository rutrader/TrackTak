module.exports = {
  flags: {
    DEV_SSR: false
  },
  plugins: [
    {
      resolve: '@elegantstack/gatsby-theme-flexiblocks',
      options: {
        createDemoPages: true,
        colorMode: true
      }
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: 'powersheet.io'
      }
    }
  ],
  // Customize your site metadata
  siteMetadata: {
    title: 'FlexiBlocks Theme',
    name: 'FlexiBlocks',
    description: 'My site description...'
  }
}
