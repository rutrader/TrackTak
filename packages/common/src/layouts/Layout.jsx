import { Box, Container } from '@mui/material'
import React from 'react'

const Layout = ({ children, header }) => {
  return (
    <Container maxWidth='md'>
      {header}
      <Box sx={{ mb: 10 }}>{children}</Box>
    </Container>
  )
}

export default Layout
