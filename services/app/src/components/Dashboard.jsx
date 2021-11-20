import { Box, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { utils, useAuth, api } from '@tracktak/common'
import SearchTickerDialog from './SearchTickerDialog'
import FolderDrawer from './FolderDrawer'
import { ProvideSpreadsheetsMetadata } from '../hooks/useSpreadsheetsMetadata'

const Dashboard = () => {
  const [folders, setFolders] = useState([])
  const [data, setData] = useState({})
  const { getAccessToken } = useAuth()
  const [showSearchTickerDialog, setShowSearchTickerDialog] = useState(false)

  const handleShowSearchTickerDialog = () => {
    setShowSearchTickerDialog(true)
  }

  const handleCloseSearchTickerDialog = () => {
    setShowSearchTickerDialog(false)
  }

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessToken()
      const accessToken = token?.jwtToken

      const getSpreadsheetsMetadataPromise =
        api.getSpreadsheetsMetadata(accessToken)
      const getFoldersPromise = api.getFolders(accessToken)

      const dataResponse = await Promise.all([
        getSpreadsheetsMetadataPromise,
        getFoldersPromise
      ])

      const spreadsheets = dataResponse[0].data.spreadsheets
      const folders = dataResponse[1].data.folders

      const defaultFolderId = folders[0]._id

      setData({
        spreadsheets,
        defaultFolderId
      })
      setFolders(folders)
    }
    fetchData()
  }, [getAccessToken])

  return (
    <ProvideSpreadsheetsMetadata value={data}>
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
      <FolderDrawer initialFolders={folders} />
      <Outlet />
    </ProvideSpreadsheetsMetadata>
  )
}

export default Dashboard
