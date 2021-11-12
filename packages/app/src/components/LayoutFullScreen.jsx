import { Box } from '@mui/material'
import React from 'react'
import { Header, headerLinks, useAuth } from '@tracktak/common'
import { Link } from 'react-router-dom'

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
      <Header position='relative' links={links} Link={Link} />
      {children}
    </Box>
  )
}

export default LayoutFullScreen
