import { Box } from '@mui/material'
import React from 'react'
import SearchTicker from './SearchTicker'
import { getFreeCashFlowFirmSimple } from '@tracktak/financial-model'
import AuthenticatedHeader from './AuthenticatedHeader'

const LayoutFullScreen = ({ children }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <AuthenticatedHeader
        search={
          <Box
            sx={{
              maxWidth: '800px',
              width: '100%',
              marginRight: 'auto',
              display: 'flex'
            }}
          >
            <SearchTicker
              getTemplate={getFreeCashFlowFirmSimple}
              isSmallSearch
              sx={{
                flex: 1,
                alignSelf: 'center'
              }}
            />
          </Box>
        }
        position='relative'
      />
      {children}
    </Box>
  )
}

export default LayoutFullScreen
