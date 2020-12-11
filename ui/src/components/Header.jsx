import {
  AppBar,
  Box,
  Button,
  Container,
  Hidden,
  useTheme,
} from "@material-ui/core";
import React from "react";
import TracktakLogo from "../shared/TracktakLogo";
import { ReactComponent as TracktakSmallLogo } from "../icons/tracktakSmallLogo.svg";
import SearchTicker from "./SearchTicker";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const Header = () => {
  const theme = useTheme();
  const extraMargin = 20;
  const mb = `${theme.mixins.toolbar.minHeight + extraMargin}px`;

  return (
    <Box sx={{ mb }}>
      <AppBar color="inherit">
        <Container maxWidth={false}>
          <Box sx={{ display: "flex", py: 1 }}>
            <Box sx={{ mr: 2 }}>
              <Hidden smDown>
                <TracktakLogo />
              </Hidden>
              <Hidden smUp>
                <Link to="/">
                  <TracktakSmallLogo width={52} height={38} />
                </Link>
              </Hidden>
            </Box>
            <Box sx={{ flex: "0 1 450px", minWidth: "120px", mr: 2 }}>
              <SearchTicker removeInputPadding />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Hidden smDown>
                <Button variant="outlined" to="/valuations" component={Link}>
                  Valuations
                </Button>
              </Hidden>
              <Hidden smUp>
                <MenuIcon color="primary" />
              </Hidden>
            </Box>
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
