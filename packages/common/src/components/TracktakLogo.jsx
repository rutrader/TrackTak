import { Box, Hidden, Button } from '@mui/material'
import React from 'react'
import tracktakLogoSvg from '../assets/tracktak-logo.svg'
import tracktakLogoSmallSvg from '../assets/tracktak-logo-small.svg'
import { useAuth } from '../hooks/useAuth'

const LogoButton = ({ children, navigate }) => {
  const { isAuthenticated } = useAuth()

  return (
    <Button
      onClick={() => {
        navigate('/')
      }}
      style={{
        lineHeight: 'inherit',
        fontSize: 'inherit'
      }}
      title={`Back to the ${isAuthenticated ? 'dashboard' : 'home page'}`}
    >
      {children}
    </Button>
  )
}

const TracktakLogo = ({ logoProps, navigate, ...props }) => {
  return (
    <Box {...props}>
      <Hidden mdDown implementation='css'>
        <LogoButton navigate={navigate}>
          <img {...logoProps} alt='tracktak' src={tracktakLogoSvg} />
        </LogoButton>
      </Hidden>
      <Hidden mdUp implementation='css'>
        <LogoButton navigate={navigate}>
          <img {...logoProps} alt='t' src={tracktakLogoSmallSvg} />
        </LogoButton>
      </Hidden>
    </Box>
  )
}
export default TracktakLogo
