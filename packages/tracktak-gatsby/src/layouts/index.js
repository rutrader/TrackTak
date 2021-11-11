import Layout from './Layout'
import LayoutHome from './LayoutHome'
import React from 'react'
import { TTSnackbar } from '@tracktak/common'
import LayoutPricing from './LayoutPricing'

const Root = ({ children, pageContext }) => {
  if (pageContext.layout === 'home') {
    return <LayoutHome>{children}</LayoutHome>
  }
  if (pageContext.layout === 'pricing') {
    return <LayoutPricing>{children}</LayoutPricing>
  }

  return <Layout>{children}</Layout>
}

export default ({ children, pageContext, params }) => {
  return (
    <Root pageContext={pageContext} params={params}>
      {children}
      <TTSnackbar />
    </Root>
  )
}
