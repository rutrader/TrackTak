import { Box, Container } from '@mui/material'
import React from 'react'
import Header from './Header'
import { getHeaderLinks } from '../shared/getHeaderLinks'
import { useAuth } from '../hooks/useAuth'

const Layout = ({ children, navigate }) => {
  const { isAuthenticated } = useAuth()
  const links = getHeaderLinks(isAuthenticated)

  return (
    <Container maxWidth='md'>
      <Header links={links} navigate={navigate} />
      <Box sx={{ mb: 10 }}>{children}</Box>
    </Container>
  )
}

export default Layout
