import React, { forwardRef, useEffect, useState } from 'react'
import Folder from '@mui/icons-material/Folder'
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
  Divider,
  Drawer,
  Box,
  useTheme
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'

const drawerWidth = 240

const FolderDrawer = ({ folders }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const isOnMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const top = theme.mixins.toolbar.minHeight - 2

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    setOpen(true)
  }, [])

  const getSidePanelTabs = (
    <List>
      {folders.map(folder => {
        return (
          <ListItem key={folder.name} button>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary={folder.name} />
          </ListItem>
        )
      })}
      <ListItem button sx={{ marginTop: '10px' }}>
        <ListItemIcon>
          <CreateNewFolderIcon />
        </ListItemIcon>
        <ListItemText primary='New Folder' />
      </ListItem>
    </List>
  )

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
          {getSidePanelTabs}
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
