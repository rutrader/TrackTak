import React from 'react'
import { Box } from 'theme-ui'
import defaultContent from '@solid-ui-blocks/utils/default.content'

const WithDefaultContent = Block => ({ content = {}, ...props }) => {
  const title = `Block: ${Block.name} | Page: ${content.page} | Identifier: ${content.identifier}`
  return (
    <Box title={title} id={content.identifier}>
      <Block content={{ ...defaultContent, ...content }} {...props} />
    </Box>
  )
}

export default WithDefaultContent
