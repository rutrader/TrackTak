import {
  AppBar,
  Box,
  Button,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import MenuIcon from "@material-ui/icons/Menu";
import SearchTicker from "./SearchTicker";
import TracktakLogo from "./TracktakLogo";
import { useAuth } from "../hooks/useAuth";

const buttonStyle = {
  textTransform: "none",
  fontWeight: "bold",
  color: (theme) => theme.palette.primary.mainTextColor,
};

const HeaderLink = ({ to, text, style, isSignOut = false }) => {
  const { getAccessToken, signOut } = useAuth();

  const handleOnSignOut = async () => {
    if (await getAccessToken()) {
      signOut();
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        mx: 1,
        whiteSpace: "nowrap",
        marginRight: 2.25,
        ...style,
      }}
    >
      {isSignOut ? (
        <Button sx={buttonStyle} onClick={handleOnSignOut}>
          Sign Out
        </Button>
      ) : (
        <Button sx={buttonStyle} to={to} component={Link}>
          {text}
        </Button>
      )}
    </Box>
  );
};

const Header = ({ hideSearch, position = "fixed", links }) => {
  const theme = useTheme();
  const extraPadding = 20;
  const paddingBottom = `${theme.mixins.toolbar.minHeight + extraPadding}px`;
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const { isAuthenticated, getAccessToken, signOut } = useAuth();

  const handleOnSignOut = async () => {
    if (await getAccessToken()) {
      signOut();
      navigate("/");
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccountMenuClick = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setUserMenuAnchorEl(null);
    handleClose();
  };

  const getUserAccountMenuItems = () => (
    <>
      <MenuItem
        key="dashboard"
        to="/dashboard"
        component={Link}
        onClick={handleAccountMenuClose}
        sx={buttonStyle}
      >
        Dashboard
      </MenuItem>
      <MenuItem
        key="account-settings"
        to="/account-settings"
        component={Link}
        onClick={handleAccountMenuClose}
        sx={buttonStyle}
      >
        Settings
      </MenuItem>
      <MenuItem
        key="sign-out"
        to="/"
        component={Link}
        onClick={handleOnSignOut}
        sx={buttonStyle}
      >
        Sign Out
      </MenuItem>
    </>
  );

  const renderUserMenu = () => {
    return (
      <>
        <Button
          sx={buttonStyle}
          onClick={handleAccountMenuClick}
          aria-controls="account-menu-button"
          aria-haspopup="true"
        >
          Account
        </Button>
        <Menu
          id="account-menu"
          anchorEl={userMenuAnchorEl}
          keepMounted
          open={Boolean(userMenuAnchorEl)}
          onClose={handleAccountMenuClose}
        >
          {getUserAccountMenuItems()}
        </Menu>
      </>
    );
  };

  return (
    <>
      <Box sx={{ paddingBottom: position === "fixed" ? paddingBottom : 2 }}>
        <AppBar
          sx={{
            position,
            py: 1,
            px: 3,
            background: "#fff",
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "left",
              justifyContent: "left",
            }}
          >
            <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
              <TracktakLogo />
            </Box>
            <Box
              sx={{
                maxWidth: "800px",
                minWidth: "130px",
                width: "100%",
                marginRight: "auto",
              }}
            >
              {!hideSearch && <SearchTicker isSmallSearch />}
            </Box>
            <Hidden mdDown implementation="css">
              <Box sx={{ display: "flex" }}>
                {links.map((link, i) => (
                  <HeaderLink
                    key={link.to}
                    sx={{ ml: i === 0 ? 2 : 0 }}
                    {...link}
                  />
                ))}
                {isAuthenticated && renderUserMenu()}
              </Box>
            </Hidden>
            <Hidden mdUp implementation="css">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: 2.5,
                  height: "100%",
                }}
              >
                <IconButton
                  sx={{
                    padding: 0,
                  }}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MenuIcon color="primary" />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {isAuthenticated && getUserAccountMenuItems()}
                  {links.map((link) => (
                    <MenuItem
                      key={link.to}
                      to={link.to}
                      component={Link}
                      onClick={handleClose}
                    >
                      {link.text}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Hidden>
          </Box>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
