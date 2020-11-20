import {
  Box,
  Container,
  Paper,
  Tab,
  Tabs,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { layoutPaths } from "../App";
import { ReactComponent as TracktakLogo } from "../icons/tracktak.svg";
import { generatePath, Link, useLocation, useParams } from "react-router-dom";

const StyledPaper = withStyles({
  root: {
    flexGow: 1,
  },
})(Paper);

const Layout = ({ children }) => {
  const location = useLocation();
  const params = useParams();

  return (
    <Container maxWidth="md">
      <Box sx={{ pt: 2.5 }}>
        <TracktakLogo />
      </Box>
      {children}
      <StyledPaper
        elevation={3}
        style={{
          position: "fixed",
          bottom: "0",
          left: "50%",
          transform: "translate(-50%)",
          maxWidth: "100%",
        }}
      >
        <Tabs
          variant="scrollable"
          value={location.pathname}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
        >
          {layoutPaths.map((path) => {
            const generatedPath = generatePath(path, { ...params });

            return (
              <Tab
                key={path}
                component={Link}
                to={generatedPath}
                value={generatedPath}
                label={path.split("/")[1]}
              />
            );
          })}
        </Tabs>
      </StyledPaper>
    </Container>
  );
};

export default Layout;
