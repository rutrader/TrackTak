import { Container } from '@material-ui/core'
import React from 'react'
import Header from '../components/Header'
import { useAuth } from '../hooks/useAuth'
import { getHeaderLinks } from '../../../packages/common/src/shared/getHeaderLinks'

const LayoutPricing = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const links = getHeaderLinks(isAuthenticated)

  return (
    <Container maxWidth='xl'>
      <Header hideSearch links={links} />
      {children}
    </Container>
  )
}

export default LayoutPricing
