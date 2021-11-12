import React from 'react'
import Dashboard from './components/Dashboard'
import { createStore } from '@tracktak/financial-model'
import { TTProvider, snackbarReducer } from '@tracktak/common'

const store = createStore(undefined, {
  snackbar: snackbarReducer
})

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
