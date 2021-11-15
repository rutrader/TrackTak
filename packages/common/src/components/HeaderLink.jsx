import React from 'react'
import LinkButton from './LinkButton'
import { Box } from '@mui/material'

const HeaderLink = ({ text, sx, ...props }) => {
  return (
    <Box
      sx={{
        mx: 1,
        whiteSpace: 'nowrap',
        marginRight: 2.25,
        ...sx
      }}
    >
      {/* aria-current due to @reach/router bug mismatch between server/client */}
      <LinkButton aria-current={null} {...props}>
        {text}
      </LinkButton>
    </Box>
  )
}

export default HeaderLink
