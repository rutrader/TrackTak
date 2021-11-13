import { Container } from '@mui/material'
import React from 'react'
import { Header, headerLinks, useAuth } from '@tracktak/common'
import { navigate } from 'gatsby'

const LayoutPricing = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const links = headerLinks.getHeaderLinks(isAuthenticated)

  return (
    <Container maxWidth='xl'>
      <Header navigate={navigate} links={links} />
      {children}
    </Container>
  )
}

export default LayoutPricing
