import React, { useEffect, useState } from 'react'
import {
  Box,
  Drawer,
  useMediaQuery,
  Divider,
  Hidden,
  IconButton,
  useTheme
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const drawerWidth = 240

const SidePanel = ({ sidePanelTabs, children }) => {
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
          {sidePanelTabs}
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
      <Box component='div' sx={{ width: '100%', position: 'relative' }}>
        {children}
      </Box>
    </Box>
  )
}

export default SidePanel
