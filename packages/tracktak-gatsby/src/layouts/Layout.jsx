import { Box, Container } from '@mui/material'
import React from 'react'
import { Header, headerLinks } from '@tracktak/common'
import { useAuth } from '@tracktak/auth'

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
