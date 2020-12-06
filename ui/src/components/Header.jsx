import { AppBar, Box, Container, Hidden, useTheme } from "@material-ui/core";
import React from "react";
import TracktakLogo from "../shared/TracktakLogo";
import { ReactComponent as TracktakSmallLogo } from "../icons/tracktakSmallLogo.svg";
import SearchTicker from "./SearchTicker";

const Header = () => {
  const theme = useTheme();
  const extraMargin = 20;
  const mb = `${theme.mixins.toolbar.minHeight + extraMargin}px`;

  return (
    <Box sx={{ mb }}>
      <AppBar color="inherit">
        <Container maxWidth={false}>
          <Box sx={{ display: "flex", py: 1 }}>
            <Hidden smDown>
              <Box sx={{ mr: 5 }}>
                <TracktakLogo />
              </Box>
            </Hidden>
            <Hidden smUp>
              <Box sx={{ mr: 2 }}>
                <TracktakSmallLogo width={52} height={38} />
              </Box>
            </Hidden>
            <Box sx={{ flex: "0 1 450px", minWidth: "200px" }}>
              <SearchTicker removeInputPadding />
            </Box>
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
