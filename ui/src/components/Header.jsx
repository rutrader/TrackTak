import { AppBar, Box, Container, useTheme } from "@material-ui/core";
import React from "react";
import TracktakLogo from "../shared/TracktakLogo";
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
            <TracktakLogo />
            <Box sx={{ ml: 5, flex: "0 1 450px" }}>
              <SearchTicker removeInputPadding />
            </Box>
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
