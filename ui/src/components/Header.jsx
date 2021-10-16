import {
  AppBar,
  Avatar,
  Box,
  Button,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import MenuIcon from "@material-ui/icons/Menu";
import SearchTicker from "./SearchTicker";
import TracktakLogo from "./TracktakLogo";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "@material-ui/core/styles";

export const LinkButton = ({ sx, ...props }) => {
  return (
    <Button
      sx={{
        px: 2,
        width: "100%",
        textTransform: "none",
        fontWeight: "bold",
        color: (theme) => theme.palette.primary.mainTextColor,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        height: "48px",
        whiteSpace: "nowrap",
        ...sx,
      }}
      {...props}
    />
  );
};

const MenuItemLink = (props) => {
  return <MenuItem sx={{ "&.MuiMenuItem-root": { padding: 0 } }} {...props} />;
};

const SignOutButton = ({ handleOnSignOut, ...props }) => {
  return (
    <LinkButton
      onClick={() => {
        handleOnSignOut();
      }}
      {...props}
    >
      Sign Out
    </LinkButton>
  );
};

const HeaderLink = ({ to, text, style }) => {
  return (
    <Box
      sx={{
        mx: 1,
        whiteSpace: "nowrap",
        marginRight: 2.25,
        ...style,
      }}
    >
      {/* aria-current due to @reach/router bug mismatch between server/client */}
      <LinkButton aria-current={null} to={to} component={Link}>
        {text}
      </LinkButton>
    </Box>
  );
};

const Header = ({ hideSearch, position = "fixed", links = [], children }) => {
  const theme = useTheme();
  const extraPadding = 20;
  const paddingBottom = `${theme.mixins.toolbar.minHeight + extraPadding}px`;
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const { isAuthenticated, signOut } = useAuth();

  const handleOnSignOut = async () => {
    if (isAuthenticated) {
      signOut();
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

  const getUserAccountMenuItems = () => [
    <MenuItemLink key="dashboard">
      <LinkButton
        onClick={() => {
          navigate("/dashboard");
          handleAccountMenuClose();
        }}
      >
        Dashboard
      </LinkButton>
    </MenuItemLink>,
    <MenuItemLink key="account-settings">
      <LinkButton
        onClick={() => {
          navigate("/account-settings");
          handleAccountMenuClose();
        }}
      >
        Settings
      </LinkButton>
    </MenuItemLink>,
    <MenuItemLink key="pricing">
      <LinkButton
        onClick={() => {
          navigate("/pricing");
          handleAccountMenuClose();
        }}
      >
        Pricing
      </LinkButton>
    </MenuItemLink>,
    <MenuItemLink key="sign-out">
      <SignOutButton key="sign-out" handleOnSignOut={handleOnSignOut} />
    </MenuItemLink>,
  ];

  return (
    <>
      <Box
        sx={{
          paddingBottom: position === "fixed" ? paddingBottom : 0,
        }}
      >
        <AppBar
          sx={{
            position,
            py: 0.5,
            px: 3,
            background: "#fff",
            boxShadow:
              "0 1px 0px 0 rgb(0 0 0 / 10%), 0 0px 0px 0 rgb(0 0 0 / 6%)",
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
                width: "100%",
                marginRight: "auto",
                display: "flex",
              }}
            >
              {!hideSearch && (
                <SearchTicker
                  isSmallSearch
                  sx={{
                    flex: 1,
                    alignSelf: "center",
                  }}
                />
              )}
            </Box>
            <Hidden mdDown implementation="css">
              <Box
                sx={{
                  display: "flex",
                }}
              >
                {links.map((link, i) => {
                  return (
                    <HeaderLink
                      key={link.to}
                      sx={{ ml: i === 0 ? 2 : 0 }}
                      {...link}
                    />
                  );
                })}
                {children}
                {isAuthenticated && (
                  <>
                    <LinkButton
                      onClick={handleAccountMenuClick}
                      aria-controls="account-menu-button"
                      aria-haspopup="true"
                    >
                      <Avatar sx={{ width: "32px", height: "32px" }} />
                    </LinkButton>
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
                )}
              </Box>
            </Hidden>
            <Hidden mdUp implementation="css">
              {children ? (
                children
              ) : (
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
                      <MenuItemLink key={link.to}>
                        <LinkButton
                          component={Link}
                          onClick={handleClose}
                          to={link.to}
                        >
                          {link.text}
                        </LinkButton>
                      </MenuItemLink>
                    ))}
                  </Menu>
                </Box>
              )}
            </Hidden>
          </Box>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
