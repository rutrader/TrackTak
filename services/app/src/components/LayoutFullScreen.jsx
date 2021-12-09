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
      <AuthenticatedHeader position='relative' />
      {children}
    </Box>
  )
}

export default LayoutFullScreen
