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
import featureToggle from "../shared/featureToggle";

const getRightLinks = (isAuthenticated) => {
  const links = [
    { to: "/how-to-do-a-dcf", text: "Documentation" },
    { to: "/blogs", text: "Blogs" },
    { to: "/stock-valuations", text: "Valuations" },
    { to: "/contact-us", text: "Contact" },
    {
      to: "/about-us",
      text: "About us",
    },
  ];

  if (featureToggle.AUTHENTICATION && !isAuthenticated) {
    links.push({
      to: "/sign-in",
      text: "Sign in",
    });
  }

  return links;
};

const buttonStyle = {
  textTransform: "none",
  fontWeight: "bold",
  color: (theme) => theme.palette.primary.mainTextColor,
};

const HeaderLink = ({ to, text, style, isSignOut = false }) => {
  const { session, signOut } = useAuth();

  const handleOnSignOut = () => {
    if (session) {
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

const Header = ({ hideSearch }) => {
  const theme = useTheme();
  const extraPadding = 20;
  const paddingBottom = `${theme.mixins.toolbar.minHeight + extraPadding}px`;
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const { isAuthenticated, session, signOut } = useAuth();

  const handleOnSignOut = () => {
    if (session) {
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
        key="account-settings"
        to="/account-settings"
        component={Link}
        onClick={handleAccountMenuClose}
        sx={buttonStyle}
      >
        My Account
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
      <Box sx={{ paddingBottom }}>
        <AppBar
          sx={{
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
                {getRightLinks(isAuthenticated).map((link, i) => (
                  <HeaderLink
                    key={link.to}
                    sx={{ ml: i === 0 ? 2 : 0 }}
                    {...link}
                  />
                ))}
                {featureToggle.AUTHENTICATION &&
                  isAuthenticated &&
                  renderUserMenu()}
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
                  {getRightLinks(isAuthenticated).map((link) => (
                    <MenuItem
                      key={link.to}
                      to={link.to}
                      component={Link}
                      onClick={handleClose}
                    >
                      {link.text}
                    </MenuItem>
                  ))}
                  {featureToggle.AUTHENTICATION &&
                    isAuthenticated &&
                    getUserAccountMenuItems()}
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
