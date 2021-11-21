import React, { useEffect, useState } from 'react'
import {
  Box,
  Drawer,
  useMediaQuery,
  Divider,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Drawer,
  Box,
  useTheme
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import SidePanelTabFolders from './SidePanelTabFolders'
import { useAuth, api } from '@tracktak/common'

const drawerWidth = 240

const FolderDrawer = ({ folders }) => {
  const theme = useTheme()
  const { getAccessToken } = useAuth()
  const [open, setOpen] = useState(false)
  const [newFolders, setNewFolders] = useState([])
  const isOnMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const top = theme.mixins.toolbar.minHeight - 2

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleOnClickCreateNewFolder = async () => {
    const token = await getAccessToken()
    const accessToken = token?.jwtToken

    const dataResponse = await api.createFolder('New Folder', accessToken)

    setNewFolders([...newFolders, dataResponse.data.folder])
  }

  useEffect(() => {
    setNewFolders(folders)
  }, [folders])

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        '& .MuiDrawer-root': {
          [theme.breakpoints.down(1550)]: {
            width: open ? drawerWidth : 'initial'
          }
        }
      }}
    >
      <Drawer
        variant={isOnMobile ? 'persistent' : 'permanent'}
        anchor='left'
        open={open}
        PaperProps={{
          style: {
            top,
            width: drawerWidth,
            height: `calc(100% - ${top}px)`
          }
        }}
      >
        <>
          <Hidden smUp implementation='css'>
            <Box>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon color='primary' />
              </IconButton>
            </Box>
            <Divider />
          </Hidden>
          <List>
            {newFolders.map(({ _id, name }) => {
              return (
                <SidePanelTabFolders key={_id} id={_id} folderName={name} />
              )
            })}
            <Divider sx={{ my: 0.5 }} />
            <ListItem
              button
              sx={{ marginTop: '10px' }}
              onClick={handleOnClickCreateNewFolder}
            >
              <ListItemIcon>
                <CreateNewFolderIcon />
              </ListItemIcon>
              <ListItemText primary='New Folder' />
            </ListItem>
          </List>
        </>
      </Drawer>
      <Hidden smUp implementation='css'>
        <IconButton
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          sx={{
            position: 'fixed',
            padding: 0,
            left: 0,
            top: theme => theme.mixins.toolbar.minHeight + 10
          }}
        >
          <ChevronRightIcon color='primary' />
        </IconButton>
      </Hidden>
    </Box>
  )
}

export default FolderDrawer
