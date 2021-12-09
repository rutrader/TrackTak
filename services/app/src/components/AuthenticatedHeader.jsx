import { Avatar, Box, Hidden, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Header,
  HeaderLink,
  LinkButton,
  links,
  useAuth
} from '@tracktak/common'
import { useNavigate } from 'react-router-dom'

const MenuItemLink = props => {
  return <MenuItem sx={{ '&.MuiMenuItem-root': { padding: 0 } }} {...props} />
}

const AuthenticatedHeader = ({ position = 'fixed' }) => {
  const { signOut } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null)
  const navigate = useNavigate()

  const handleOnSignOut = async () => {
    signOut()
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAccountMenuClick = event => {
    setUserMenuAnchorEl(event.currentTarget)
  }

  const handleAccountMenuClose = () => {
    setUserMenuAnchorEl(null)
    handleClose()
  }

  const linkButtonOnClick = (relative, to) => {
    if (relative) {
      navigate(to)
    } else {
      window.location.href = `${process.env.DOMAIN_URL}${to}`
    }
  }

  const getUserAccountMenuItems = () => [
    <MenuItemLink key='dashboard'>
      <LinkButton
        onClick={() => {
          navigate('/')
          handleAccountMenuClose()
        }}
      >
        Dashboard
      </LinkButton>
    </MenuItemLink>,
    <MenuItemLink key='account-settings'>
      <LinkButton
        onClick={() => {
          navigate('/account-settings')
          handleAccountMenuClose()
        }}
      >
        Settings
      </LinkButton>
    </MenuItemLink>,
    <MenuItemLink key='sign-out'>
      <LinkButton onClick={handleOnSignOut}>Sign Out</LinkButton>
    </MenuItemLink>
  ]

  return (
    <Header navigate={navigate} position={position}>
      <Hidden mdDown implementation='css'>
        <Box
          sx={{
            display: 'flex'
          }}
        >
          {links.headerLinks.map((link, i) => {
            return (
              <HeaderLink
                key={link.text}
                sx={{ ml: i === 0 ? 2 : 0 }}
                onClick={() => linkButtonOnClick(link.relative, link.to)}
                {...link}
              />
            )
          })}
          <LinkButton
            onClick={handleAccountMenuClick}
            aria-controls='account-menu-button'
            aria-haspopup='true'
          >
            <Avatar sx={{ width: '32px', height: '32px' }} />
          </LinkButton>
          <Menu
            id='account-menu'
            anchorEl={userMenuAnchorEl}
            keepMounted
            open={Boolean(userMenuAnchorEl)}
            onClose={handleAccountMenuClose}
          >
            {getUserAccountMenuItems()}
          </Menu>
        </Box>
      </Hidden>
      <Hidden mdUp implementation='css'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            ml: 2.5,
            height: '100%'
          }}
        >
          <IconButton
            sx={{
              padding: 0
            }}
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            <MenuIcon color='primary' />
          </IconButton>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {getUserAccountMenuItems()}
            {links.headerLinks.map(link => (
              <MenuItemLink key={link.text}>
                <LinkButton
                  onClick={() => linkButtonOnClick(link.relative, link.to)}
                >
                  {link.text}
                </LinkButton>
              </MenuItemLink>
            ))}
          </Menu>
        </Box>
      </Hidden>
    </Header>
  )
}

export default AuthenticatedHeader
