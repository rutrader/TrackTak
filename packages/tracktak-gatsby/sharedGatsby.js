import React from 'react'
import { createStore } from '@tracktak/financial-model'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/700.css'
import theme from './src/theme'
import { snackbarReducer } from './src/redux/reducers/snackbarReducer'
import { ProvideAuth } from '@tracktak/common'
import TTCookieBanner from './src/components/TTCookieBanner'
import { CssBaseline } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'
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
