import { Container } from '@mui/material'
import React from 'react'
import { Header, headerLinks } from '@tracktak/common'
import { useAuth } from '@tracktak/auth'

const LayoutPricing = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const links = headerLinks.getHeaderLinks(isAuthenticated)

  return (
    <Container maxWidth='xl'>
      <Header hideSearch links={links} />
      {children}
    </Container>
  )
}

export default LayoutPricing
