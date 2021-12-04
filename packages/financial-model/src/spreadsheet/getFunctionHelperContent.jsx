import React from 'react'
import { render } from 'react-dom'
import { TTProvider } from '@tracktak/common'
import HelperContent from './plugins/stockFinancials/HelperContent'

const getFunctionHelperContent = setTicker => {
  const content = document.createElement('div')

  render(
    <TTProvider>
      <HelperContent setTicker={setTicker} />
    </TTProvider>,
    content
  )

  return content
}

export default getFunctionHelperContent
