import { Box, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { utils, withAuthentication } from '@tracktak/common'
import SavedSpreadsheets from './SavedSpreadsheets'
import SearchTickerDialog from './SearchTickerDialog'

const Dashboard = () => {
  const [showSearchTickerDialog, setShowSearchTickerDialog] = useState(false)

  const handleShowSearchTickerDialog = () => {
    setShowSearchTickerDialog(true)
  }

  const handleCloseSearchTickerDialog = () => {
    setShowSearchTickerDialog(false)
  }

  return (
    <>
      <Helmet>
        <title>{utils.getTitle('Dashboard')}</title>
      </Helmet>
      <SearchTickerDialog
        open={showSearchTickerDialog}
        onClose={handleCloseSearchTickerDialog}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography variant='h5' gutterBottom>
          My Valuations
        </Typography>
        <IconButton
          sx={{
            ml: 'auto',
            padding: 0,
            backgroundColor: theme => theme.palette.primary.light,
            width: '40px',
            height: '40px',
            '&:hover': {
              backgroundColor: theme => theme.palette.primary.dark
            }
          }}
          onClick={handleShowSearchTickerDialog}
        >
          <AddIcon style={{ color: 'white' }} fontSize='large' />
        </IconButton>
      </Box>
      <SavedSpreadsheets onNewSpreadsheetClick={handleShowSearchTickerDialog} />
    </>
  )
}

export default withAuthentication(Dashboard)
