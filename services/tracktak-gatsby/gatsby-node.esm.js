// https://github.com/gatsbyjs/gatsby/issues/7810
// CLI with esm npx has a bug in it for windows: https://github.com/npm/npx/issues/5

export const onCreatePage = ({ page, actions }) => {
  const { createPage } = actions

  if (page.path === '/') {
    page.context.layout = 'xl'
    createPage(page)
  }

  if (page.path === '/sign-up/') {
    page.context.layout = 'sign-up'
    createPage(page)
  }
}

export const onCreateWebpackConfig = ({ actions, plugins }) => {
  const varobj = Object.keys(process.env).reduce((acc, key) => {
    acc[`process.env.${key}`] = JSON.stringify(process.env[key])

    return acc
  }, {})

  let pluginsToAdd

  if (Object.keys(varobj).length) {
    pluginsToAdd = [plugins.define(varobj)]
  }

  actions.setWebpackConfig({ plugins: pluginsToAdd })
}
