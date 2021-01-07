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

const links = [
  { to: "/valuations", text: "Valuations" },
  { to: "/documentation", text: "Documentation" },
];

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
              {links.map((link) => (
                <Box sx={{ mr: 2 }}>
                  <Button variant="outlined" to={link.to} component={Link}>
                    {link.text}
                  </Button>
                </Box>
              ))}
            </Hidden>
            <Box sx={{ flex: "0 1 450px", minWidth: "120px" }}>
              {!hideSearch && <SearchTicker removeInputPadding />}
            </Box>
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
                  {links.map((link) => (
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
