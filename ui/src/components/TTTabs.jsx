import { Box, Paper, Tab, Tabs, useTheme } from "@material-ui/core";
import React from "react";
import { generatePath, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { layoutFullScreenPaths } from "../App";

const TTTabs = () => {
  const location = useLocation();
  const params = useParams();
  const theme = useTheme();
  const mt = `${theme.mixins.toolbar.minHeight}px`;

  return (
    <Box sx={{ mt }}>
      <Paper
        elevation={3}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          zIndex: theme.zIndex.appBar,
        }}
      >
        <Tabs
          variant="scrollable"
          value={location.pathname}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
        >
          {layoutFullScreenPaths.map((path) => {
            const generatedPath = generatePath(path, { ...params });
            const label = path.split("/")[1].replace(/-/g, " ");

            return (
              <Tab
                key={path}
                component={Link}
                to={generatedPath}
                value={generatedPath}
                label={label}
              />
            );
          })}
        </Tabs>
      </Paper>
    </Box>
  );
};

export default TTTabs;
