import { Box } from '@mui/material'
import React from 'react'
import { Header, headerLinks } from '@tracktak/common'
import { useAuth } from '@tracktak/auth'

const LayoutFullScreen = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const links = headerLinks.getHeaderLinks(isAuthenticated)

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Header position='relative' links={links} />
      {children}
    </Box>
  )
}

export default LayoutFullScreen
