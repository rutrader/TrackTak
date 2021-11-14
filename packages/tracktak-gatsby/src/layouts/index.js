import { Layout, LayoutXL, HeaderLink, Header } from '@tracktak/common'
import React from 'react'
import { navigate, Link } from 'gatsby'
import HeaderGoToButton from '../components/HeaderGoToButton'

const LayoutSelection = ({ children, pageContext }) => {
  if (pageContext.layout === 'xl') {
    return (
      <LayoutXL
        header={
          <Header navigate={navigate}>
            <HeaderGoToButton />
          </Header>
        }
      >
        {children}
      </LayoutXL>
    )
  }

  if (pageContext.layout === 'sign-up') {
    return (
      <Layout
        header={
          <Header navigate={navigate}>
            <HeaderLink component={Link} to='/sign-in' text='Sign In' />
          </Header>
        }
      >
        {children}
      </Layout>
    )
  }

  return (
    <Layout
      header={
        <Header navigate={navigate}>
          <HeaderGoToButton />
        </Header>
      }
    >
      {children}
    </Layout>
  )
}

const Root = ({ children, pageContext, params }) => {
  return (
    <LayoutSelection pageContext={pageContext} params={params}>
      {children}
    </LayoutSelection>
  )
}

export default Root
