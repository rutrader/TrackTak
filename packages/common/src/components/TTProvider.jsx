import React from 'react'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/700.css'
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material'
import theme from '../theme'
import { ProvideAuth } from '../hooks/useAuth'
import snackbarReducer from '../redux/reducers/snackbarReducer'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import TTSnackbar from './TTSnackbar'

const createStore = (preloadedState, reducers) => {
  return configureStore({
    reducer: combineReducers(reducers),
    preloadedState
  })
}

const store = createStore(undefined, {
  snackbar: snackbarReducer
})

const TTProvider = ({ children }) => {
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <Provider store={store}>
        <CssBaseline />
        <ProvideAuth>
          {children}
          <TTSnackbar />
        </ProvideAuth>
      </Provider>
    </ThemeProvider>
  )
}

export default TTProvider
