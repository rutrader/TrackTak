import React from 'react'
import Dashboard from './components/Dashboard'
import { TTProvider } from '@tracktak/common'

const Index = () => {
  return (
    <TTProvider>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </TTProvider>
  )
}

export default Index
