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
import { useNavigate } from 'react-router-dom'

export const drawerWidth = 240

const FolderDrawer = ({ folders, fetchFolders, open, setOpen }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { getAccessToken } = useAuth()
  const isOnMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const top = theme.mixins.toolbar.minHeight - 2

  const newFoldersLength = folders.length === 1 ? true : false

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleOnClickCreateNewFolder = async () => {
    const token = await getAccessToken()
    const accessToken = token?.jwtToken

    await api.createFolder('New Folder', accessToken)

    await fetchFolders()
  }

  const handleClickDelete = async id => {
    const token = await getAccessToken()
    const accessToken = token?.jwtToken

    await api.deleteFolder(id, accessToken)

    await fetchFolders()
  }

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <>
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
            {folders.map(({ _id, name }) => {
              return (
                <SidePanelTabFolders
                  key={_id}
                  id={_id}
                  folderName={name}
                  disabledMenuitem={newFoldersLength}
                  folders={folders}
                  onDelete={handleClickDelete}
                  handleOnClickRouting={() => {
                    navigate(`/${_id}`)
                  }}
                />
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
    </>
  )
}

export default FolderDrawer
