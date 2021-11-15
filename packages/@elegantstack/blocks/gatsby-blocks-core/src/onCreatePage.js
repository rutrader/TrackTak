const withDefaults = require('./utils/default.options')

module.exports = async ({ page, actions }, pluginOptions) => {
  const { createPage, deletePage } = actions
  const { pageContextOptions } = withDefaults(pluginOptions)

  // Skip pages created by other themes
  if (
    !page.isCreatedByStatefulCreatePages ||
    Object.keys(page.context).length !== 0
  ) {
    return
  }

  deletePage(page)

  // Pass theme options to auto-created pages
  createPage({
    ...page,
    context: {
      ...page.context,
      ...pageContextOptions
    }
  })
}
