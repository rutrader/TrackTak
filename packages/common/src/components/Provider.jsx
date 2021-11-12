import React from 'react'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/700.css'
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material'
import theme from '../theme'
import { ProvideAuth } from '../hooks/useAuth'

const TTProvider = ({ children }) => {
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      <ProvideAuth>{children}</ProvideAuth>
    </ThemeProvider>
  )
}

export default TTProvider
