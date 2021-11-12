import React from 'react'
import { createStore } from '@tracktak/financial-model'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/700.css'
import { ProvideAuth, theme, snackbarReducer } from '@tracktak/common'
import TTCookieBanner from './src/components/TTCookieBanner'
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'

const store = createStore(undefined, {
  snackbar: snackbarReducer
})

export const wrapRootElement = ({ element }) => {
  // Do not put components in this function, instead put them in layout/index.js
  // due to a gatsby/mui bug
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <Provider store={store}>
        <CssBaseline />
        <ProvideAuth>
          {element}
          <TTCookieBanner />
        </ProvideAuth>
      </Provider>
    </ThemeProvider>
  )
}
