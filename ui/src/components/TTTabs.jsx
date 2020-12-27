import { Paper, Tab, Tabs, useTheme, withStyles } from "@material-ui/core";
import React from "react";
import { generatePath, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { tabPaths } from "../App";

const StyledPaper = withStyles({
  root: {
    flexGow: 1,
  },
})(Paper);

const TTTabs = () => {
  const location = useLocation();
  const params = useParams();
  const theme = useTheme();

  return (
    <StyledPaper
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
        {tabPaths.map((path) => {
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
  );
};

export default TTTabs;
