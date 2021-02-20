import {
  AppBar,
  Box,
  Button,
  Hidden,
  Menu,
  MenuItem,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import SearchTicker from "./SearchTicker";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core";
import { ReactComponent as TracktakPurpleSmall } from "../icons/tracktak-logo-small.svg";
import TracktakLogo from "../shared/TracktakLogo";

const rightLinks = [
  { to: "/how-to-do-a-dcf", text: "Documentation" },
  { to: "/stock-valuations", text: "Valuations" },
  { to: "/contact-us", text: "Contact" },
  {
    to: "/about-us",
    text: "About us",
  },
];

const allLinks = [...rightLinks];

const useStyles = makeStyles((theme) => ({
  app: {
    padding: "7px 25px",
    background: "#fff",
  },
}));

const HeaderLink = ({ to, text, style }) => {
  return (
    <Box style={{ mx: 1, whiteSpace: "nowrap", ...style }}>
      <Button
        style={{
          textTransform: "none",
          fontSize: "16px",
          fontWeight: 600,
          color: "#313450",
        }}
        to={to}
        component={Link}
      >
        {text}
      </Button>
    </Box>
  );
};

const Header = ({ hideSearch }) => {
  const classes = useStyles();
  const theme = useTheme();
  const extraPadding = 20;
  const paddingBottom = `${theme.mixins.toolbar.minHeight + extraPadding}px`;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box style={{ paddingBottom }}>
        <AppBar className={classes.app}>
          <Box
            style={{
              display: "flex",
              alignItems: "left",
              justifyContent: "left",
            }}
          >
            <Box
              style={{ marginRight: 2, display: "flex", alignItems: "center" }}
            >
              <Hidden mdDown>
                <TracktakLogo />
              </Hidden>
              <Hidden mdUp>
                <Link to="/">
                  <TracktakPurpleSmall width={52} height={38} />
                </Link>
              </Hidden>
            </Box>
            <Box
              style={{
                flex: "0 1 450px",
                minWidth: "120px",
                marginLeft: 1,
                marginRight: "auto",
              }}
            >
              {!hideSearch && <SearchTicker isSmallSearch />}
            </Box>
            <Hidden mdDown>
              {rightLinks.map((link, i) => (
                <HeaderLink style={{ marginLeft: i === 0 ? 2 : 0 }} {...link} />
              ))}
            </Hidden>
            <Hidden mdUp>
              <Box
                style={{ display: "flex", alignItems: "center", marginLeft: 2 }}
              >
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
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
