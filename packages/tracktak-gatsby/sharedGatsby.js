import React from 'react'
import TTCookieBanner from './src/components/TTCookieBanner'
import { TTProvider } from '@tracktak/common'

export const wrapRootElement = ({ element }) => {
  return (
    <TTProvider>
      {element}
      <TTCookieBanner />
    </TTProvider>
  )
}
