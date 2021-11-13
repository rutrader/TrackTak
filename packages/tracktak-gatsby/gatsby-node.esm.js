// https://github.com/gatsbyjs/gatsby/issues/7810
// CLI with esm npx has a bug in it for windows: https://github.com/npm/npx/issues/5

export const onCreatePage = ({ page, actions }) => {
  const { createPage } = actions

  if (page.path === '/') {
    page.context.layout = 'home'
    createPage(page)
  }

  if (page.path === '/pricing/') {
    page.context.layout = 'pricing'
    createPage(page)
  }
}
