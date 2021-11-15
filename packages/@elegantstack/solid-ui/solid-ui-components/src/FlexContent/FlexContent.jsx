import React from 'react'
import { Box } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'

const FlexContent = ({ children, reverse }) => (
  <Box
    sx={{
      flexBasis: `1/2`,
      zIndex: [null, 1],
      mx: [null, null, null, 4]
    }}
  >
    <Reveal effect={reverse ? 'fadeInLeft' : 'fadeInRight'}>{children}</Reveal>
  </Box>
)

export default FlexContent
