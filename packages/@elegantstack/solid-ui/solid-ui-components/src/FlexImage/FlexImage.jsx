import React from 'react'
import { Box } from 'theme-ui'

const FlexImage = ({ reverse, children }) => (
  <Box
    sx={{
      flexBasis: [null, `2/3`, null, `1/2`],
      mx: [null, null, null, 4],
      [reverse ? 'ml' : 'mr']: [null, t => `-${t.sizes['1/6']}`, null],
      [reverse ? 'mt' : 'mb']: [4, 0],
      // zIndex: [null, -1],
      position: `relative`
    }}
  >
    {children}
  </Box>
)

export default FlexImage
