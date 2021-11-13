import { Box } from '@mui/material'
import React from 'react'
import { Header, headerLinks, useAuth } from '@tracktak/common'
import { useNavigate } from 'react-router-dom'
import SearchTicker from './SearchTicker'
import { freeCashFlowFirmSimple } from '@tracktak/financial-model'

const LayoutFullScreen = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const links = headerLinks.getHeaderLinks(isAuthenticated)

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Header
        search={
          <SearchTicker
            template={freeCashFlowFirmSimple}
            isSmallSearch
            sx={{
              flex: 1,
              alignSelf: 'center'
            }}
          />
        }
        position='relative'
        links={links}
        navigate={navigate}
      />
      {children}
    </Box>
  )
}

export default LayoutFullScreen
