import { Box, Container } from '@mui/material'
import React from 'react'
import { Header, headerLinks, useAuth } from '@tracktak/common'

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const links = headerLinks.getHeaderLinks(isAuthenticated)

  return (
    <Container maxWidth='md'>
      <Header hideSearch links={links} />
      <Box sx={{ mb: 10 }}>{children}</Box>
    </Container>
  )
}

export default Layout
