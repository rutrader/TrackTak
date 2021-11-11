import React, { forwardRef, useEffect, useState } from 'react'
import {
  Box,
  Drawer,
  useMediaQuery,
  Divider,
  Hidden,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { navigate } from 'gatsby'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { noop } from '../shared/utils'
import { useTheme } from '@material-ui/core/styles'

const drawerWidth = 240

const SidePanel = ({
  children,
  tabs,
  titleMenuButtons,
  selectedTab,
  setSeletedTab = noop
}) => {
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

  const getSidePanelTabs = () => (
    <List>
      {tabs.map(({ title, to }, index) => {
        return (
          <ListItem
            key={title}
            component={forwardRef((props, ref) => (
              <AnchorLink {...props} gatsbyLinkProps={{ ref }} />
            ))}
            onAnchorLinkClick={() => {
              setSeletedTab(index)
              navigate(to)
            }}
            to={to}
            button
          >
            <ListItemText primary={title} />
          </ListItem>
        )
      })}
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
          {getSidePanelTabs()}
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
      <Box component='main' sx={{ width: '100%' }}>
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            {tabs[selectedTab]?.title && (
              <Typography variant='h5' gutterBottom>
                {tabs[selectedTab].title}
              </Typography>
            )}
            {titleMenuButtons}
          </Box>
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default SidePanel
