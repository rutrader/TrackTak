import { AppBar, Box, useTheme } from '@mui/material'
import React from 'react'
import TracktakLogo from './TracktakLogo'

const Header = ({ position = 'fixed', children, navigate }) => {
  const theme = useTheme()
  const extraPadding = 20
  const paddingBottom = `${theme.mixins.toolbar.minHeight + extraPadding}px`

  return (
    <Box
      sx={{
        paddingBottom: position === 'fixed' ? paddingBottom : 0
      }}
    >
      <AppBar
        sx={{
          position,
          py: 0.5,
          px: 3,
          background: '#fff',
          boxShadow: '0 1px 0px 0 rgb(0 0 0 / 10%), 0 0px 0px 0 rgb(0 0 0 / 6%)'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              mr: 2,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <TracktakLogo navigate={navigate} />
          </Box>
          {children}
        </Box>
      </AppBar>
    </Box>
  )
}

export default Header
