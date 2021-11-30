import { Box, IconButton, Typography, useTheme } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import React, { useState, useEffect, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { utils, useAuth, api } from '@tracktak/common'
import SearchTickerDialog from './SearchTickerDialog'
import FolderDrawer, { drawerWidth } from './FolderDrawer'
import { ProvideSpreadsheetsMetadata } from '../hooks/useSpreadsheetsMetadata'

const Dashboard = () => {
  const theme = useTheme()
  const [folders, setFolders] = useState([])
  const [defaultFolderId, setDefaultFolderId] = useState()
  const [open, setOpen] = useState(false)
  const { getAccessToken } = useAuth()
  const [showSearchTickerDialog, setShowSearchTickerDialog] = useState(false)

  const handleShowSearchTickerDialog = () => {
    setShowSearchTickerDialog(true)
  }

  const handleCloseSearchTickerDialog = () => {
    setShowSearchTickerDialog(false)
  }

  const fetchFolders = useCallback(async () => {
    const token = await getAccessToken()
    const accessToken = token?.jwtToken

    const { data } = await api.getFolders(accessToken)
    const folders = data.folders
    const defaultFolderId = folders[0]._id

    setDefaultFolderId(defaultFolderId)
    setFolders(folders)
  }, [getAccessToken, setDefaultFolderId, setFolders])

  useEffect(() => {
    fetchFolders()
  }, [fetchFolders])

  return (
    <ProvideSpreadsheetsMetadata
      value={{
        defaultFolderId,
        handleShowSearchTickerDialog,
        folders
      }}
    >
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
          flexDirection: 'column',
          width: '100%',
          '& .MuiDrawer-root': {
            [theme.breakpoints.down(1550)]: {
              width: open ? drawerWidth : 'initial'
            }
          }
        }}
      >
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
        <FolderDrawer
          folders={folders}
          fetchFolders={fetchFolders}
          open={open}
          setOpen={setOpen}
        />
        <Outlet />
      </Box>
    </ProvideSpreadsheetsMetadata>
  )
}

export default Dashboard
