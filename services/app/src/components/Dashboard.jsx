import { Box, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { utils } from '@tracktak/common'
import SavedSpreadsheets from './SavedSpreadsheets'
import { Link } from 'react-router-dom'
import Templates from './Templates'
import { api, useAuth } from '@tracktak/common'

const Dashboard = () => {
  const { getAccessToken } = useAuth()
  const [spreadsheets, setSpreadsheets] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessToken()
      const response = await api.getSpreadsheetsMetadata(token?.jwtToken)

      setSpreadsheets(response.data.spreadsheets)
    }
    fetchData()
  }, [getAccessToken])

  if (spreadsheets === null) return null

  return (
    <>
      <Helmet>
        <title>{utils.getTitle('Dashboard')}</title>
      </Helmet>
      {spreadsheets.length ? (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography variant='h5' gutterBottom>
              My Financial Models
            </Typography>
            <IconButton
              component={Link}
              to='/templates'
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
            >
              <AddIcon style={{ color: 'white' }} fontSize='large' />
            </IconButton>
          </Box>
          <SavedSpreadsheets spreadsheets={spreadsheets} />
        </>
      ) : (
        <Templates />
      )}
    </>
  )
}

export default Dashboard
