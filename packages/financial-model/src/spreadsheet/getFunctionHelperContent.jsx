import React from 'react'
import { render } from 'react-dom'
import { TTProvider } from '@tracktak/common'
import HelperContent from './plugins/stock/financials/HelperContent'

const getFunctionHelperContent = () => {
  const content = document.createElement('div')

  render(
    <TTProvider>
      <HelperContent />
    </TTProvider>,
    content
  )

  return content
}

export default getFunctionHelperContent
