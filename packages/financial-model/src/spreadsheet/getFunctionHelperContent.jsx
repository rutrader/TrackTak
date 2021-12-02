import React from 'react'
import { render } from 'react-dom'
import { TTProvider } from '@tracktak/common'
import TTFinancialHelperContent from './plugins/ttFinancialPlugin/TTFinancialHelperContent'

const getFunctionHelperContent = setTicker => {
  const content = document.createElement('div')

  render(
    <TTProvider>
      <TTFinancialHelperContent setTicker={setTicker} />
    </TTProvider>,
    content
  )

  return content
}

export default getFunctionHelperContent
