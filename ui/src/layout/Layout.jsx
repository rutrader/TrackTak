import {
  Box,
  Container,
  makeStyles,
  Paper,
  Tab,
  Tabs,
} from "@material-ui/core";
import React from "react";
import { layoutPaths } from "../App";
import { ReactComponent as TracktakLogo } from "../icons/tracktak.svg";
import { generatePath, Link, useLocation, useParams } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const location = useLocation();
  const params = useParams();

  return (
    <Container maxWidth="md">
      <Box sx={{ pt: 2.5 }}>
        <TracktakLogo />
      </Box>
      {children}
      <Paper
        elevation={3}
        style={{
          position: "fixed",
          bottom: "0",
          left: "50%",
          transform: "translate(-50%)",
          maxWidth: "100%",
        }}
        className={classes.root}
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
      </Paper>
    </Container>
  );
};

export default Layout;
