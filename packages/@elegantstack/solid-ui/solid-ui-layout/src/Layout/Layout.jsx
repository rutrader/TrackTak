import React from 'react'
import { Global } from '@emotion/core'
import { ThemeProvider, merge, Flex, Box, css } from 'theme-ui'
import baseTheme from '@solid-ui-theme'
import pageContextProvider from '@helpers/pageContextProvider'
import { FormContextProvider } from '@solid-ui-components/ContentForm'
import { ModalContextProvider } from '@solid-ui-components/Modal'
import { TabsContextProvider } from '@solid-ui-components/Tabs'
import ColorMode from '@solid-ui-components/ColorMode'

const Layout = ({ children, pageContext = {}, location, theme = {} }) => {
  return (
    <ThemeProvider theme={merge(baseTheme, theme)}>
      <pageContextProvider.Provider value={{ pageContext, location }}>
        <FormContextProvider>
          <ModalContextProvider>
            <TabsContextProvider>
              <Flex variant='layout.layout'>
                <Global styles={css(theme => theme.global)} />
                <ColorMode />
                <Box variant='layout.body'>{children}</Box>
              </Flex>
            </TabsContextProvider>
          </ModalContextProvider>
        </FormContextProvider>
      </pageContextProvider.Provider>
    </ThemeProvider>
  )
}

export default Layout
