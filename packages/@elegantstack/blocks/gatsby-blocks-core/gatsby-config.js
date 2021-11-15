const _ = require('lodash')
const path = require('path')
const withDefaults = require('./src/utils/default.options')

module.exports = options => {
  options = withDefaults(options)

  const plugins = [
    {
      resolve: '@elegantstack/gatsby-plugin-proxy-directives',
      options
    },
    {
      resolve: '@elegantstack/gatsby-plugin-mkdir',
      options
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-sharp',
      options: {
        checkSupportedExtensions: false
      }
    }
  ]

  // Resolve local paths
  plugins.push({
    resolve: 'gatsby-transformer-json',
    options: {
      typeName: ({ node }) =>
        node.sourceInstanceName === 'block'
          ? 'BlockContent'
          : _.upperFirst(_.camelCase(`${path.basename(node.dir)} Json`))
    }
  })

  options.localPaths.forEach(localPath =>
    plugins.push({
      resolve: 'gatsby-source-filesystem',
      options: localPath
    })
  )

  // Resolve static paths (ie. assets)
  options.staticPaths.forEach(localPath =>
    plugins.push({
      resolve: 'gatsby-source-filesystem',
      options: localPath
    })
  )

  return {
    plugins
  }
}
