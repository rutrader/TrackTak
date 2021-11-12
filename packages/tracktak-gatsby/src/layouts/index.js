import Layout from './Layout'
import LayoutHome from './LayoutHome'
import React from 'react'
import { TTSnackbar } from '@tracktak/common'
import LayoutPricing from './LayoutPricing'

const LayoutSelection = ({ children, pageContext }) => {
  if (pageContext.layout === 'home') {
    return <LayoutHome>{children}</LayoutHome>
  }
  if (pageContext.layout === 'pricing') {
    return <LayoutPricing>{children}</LayoutPricing>
  }

  return <Layout>{children}</Layout>
}

const Root = ({ children, pageContext, params }) => {
  return (
    <LayoutSelection pageContext={pageContext} params={params}>
      {children}
      <TTSnackbar />
    </LayoutSelection>
  )
}

export default Root
