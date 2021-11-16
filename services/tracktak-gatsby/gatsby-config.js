const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

const path = require('path')
const workspaceRoot = require('find-yarn-workspace-root')
const dotenv = require('dotenv')

dotenv.config({
  path: `${workspaceRoot()}/.env.${activeEnv}`
})

const isInProduction = activeEnv === 'production'

module.exports = {
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    DEV_SSR: false
  },
  siteMetadata: {
    title: 'tracktak',
    siteUrl: 'https://tracktak.com'
  },
  plugins: [
    {
      resolve: '@elegantstack/gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@tracktak/common': path.resolve(
            __dirname,
            '../../packages/common/src'
          )
        },
        extensions: ['js', 'jsx']
      }
    },
    'gatsby-plugin-no-sourcemaps',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        plugins: []
      }
    },
    {
      resolve: 'gatsby-plugin-anchor-links',
      options: {
        offset: -60,
        duration: 0
      }
    },
    {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerPort: 3002
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-layout',
    {
      resolve: 'gatsby-plugin-material-ui',
      options: {}
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: isInProduction ? 'tracktak.com' : 'staging.tracktak.com'
      }
    },
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        id: '2536228',
        sv: 6
      }
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: process.env.CONTENTFUL_API_KEY,
        spaceId: 'kq8pz2yvb2zk',
        host: isInProduction ? undefined : 'preview.contentful.com'
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['G-WFB538909G', 'UA-185279234-1']
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sitemap'
    },
    'gatsby-plugin-robots-txt',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: `${__dirname}/src/assets/tracktak-logo-small.svg`
      }
    },
    'gatsby-plugin-mdx',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaultQuality: 90
      }
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`
      },
      __key: 'images'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`
      },
      __key: 'pages'
    }
  ]
}
