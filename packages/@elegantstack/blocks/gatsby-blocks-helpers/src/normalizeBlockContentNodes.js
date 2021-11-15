export const normalizeBlockContentNodes = (allContent, key = 'identifier') =>
  allContent?.reduce((normalized, block) => {
    normalized[block[key]] = block
    return normalized
  }, {})
