import { Container } from '@mui/material'
import React from 'react'
import { Header, headerLinks, useAuth } from '@tracktak/common'
import { Link } from 'gatsby'

const LayoutPricing = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const links = headerLinks.getHeaderLinks(isAuthenticated)

  return (
    <Container maxWidth='xl'>
      <Header links={links} Link={Link} />
      {children}
    </Container>
  )
}

export default LayoutPricing
