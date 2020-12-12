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

const Header = ({ hideSearch }) => {
  const theme = useTheme();
  const extraMargin = 20;
  const mb = `${theme.mixins.toolbar.minHeight + extraMargin}px`;

  return (
    <Box sx={{ mb }}>
      <AppBar color="inherit">
        <Container maxWidth={false}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: 1,
            }}
          >
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
            <Hidden smDown>
              <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                <Button variant="outlined" to="/valuations" component={Link}>
                  Valuations
                </Button>
              </Box>
            </Hidden>
            <Box sx={{ flex: "0 1 450px", minWidth: "120px" }}>
              {!hideSearch && <SearchTicker removeInputPadding />}
            </Box>
            <Hidden smUp>
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <MenuIcon color="primary" />
              </Box>
            </Hidden>
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
