import {
  AppBar,
  Box,
  Button,
  Container,
  Hidden,
  Menu,
  MenuItem,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import TracktakLogo from "../shared/TracktakLogo";
import { ReactComponent as TracktakSmallLogo } from "../icons/tracktakSmallLogo.svg";
import SearchTicker from "./SearchTicker";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const leftLinks = [
  { to: "/stock-valuations", text: "Valuations" },
  { to: "/how-to-do-a-dcf", text: "Documentation" },
];

const rightLinks = [
  { to: "/contact-us", text: "Contact Us" },
  {
    to: "/about-us",
    text: "About us",
  },
];

const allLinks = [...leftLinks, ...rightLinks];

const HeaderLink = ({ to, text, sx }) => {
  return (
    <Box sx={{ mx: 1, whiteSpace: "nowrap", ...sx }}>
      <Button variant="outlined" to={to} component={Link}>
        {text}
      </Button>
    </Box>
  );
};

const Header = ({ hideSearch }) => {
  const theme = useTheme();
  const extraMargin = 20;
  const mb = `${theme.mixins.toolbar.minHeight + extraMargin}px`;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ mb }}>
      <AppBar color="inherit">
        <Container maxWidth={false}>
          <Box
            sx={{
              display: "flex",
              alignItems: "left",
              justifyContent: "left",
              py: 1,
            }}
          >
            <Box sx={{ mr: 2 }}>
              <Hidden mdDown>
                <TracktakLogo />
              </Hidden>
              <Hidden mdUp>
                <Link to="/">
                  <TracktakSmallLogo width={52} height={38} />
                </Link>
              </Hidden>
            </Box>
            <Hidden mdDown>
              {leftLinks.map((link) => (
                <HeaderLink {...link} />
              ))}
            </Hidden>
            <Box
              sx={{ flex: "0 1 450px", minWidth: "120px", ml: 1, mr: "auto" }}
            >
              {!hideSearch && <SearchTicker removeInputPadding />}
            </Box>
            <Hidden mdDown>
              {rightLinks.map((link, i) => (
                <HeaderLink sx={{ ml: i === 0 ? 2 : 0 }} {...link} />
              ))}
            </Hidden>
            <Hidden mdUp>
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MenuIcon color="primary" />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {allLinks.map((link) => (
                    <MenuItem
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
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
