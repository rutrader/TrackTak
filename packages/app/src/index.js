import React from 'react'
import Dashboard from './components/Dashboard'
import { TTProvider } from '@tracktak/common'

const Index = () => {
  return (
    <TTProvider>
      <Dashboard />
    </TTProvider>
  )
}

export default Index
