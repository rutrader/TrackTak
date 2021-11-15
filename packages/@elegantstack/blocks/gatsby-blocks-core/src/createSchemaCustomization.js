const types = require('./types')

module.exports = async ({ actions }) => {
  const { createTypes } = actions

  const allTypeDefs = [types.file]

  createTypes(allTypeDefs)
}
