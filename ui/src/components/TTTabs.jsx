import { Box, Paper, Tab, Tabs, useTheme } from "@material-ui/core";
import React from "react";
import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import { sentenceCase } from "change-case";
import { useTicker } from "@tracktak/intrinsic-valuations";

const stockPaths = ["/discounted-cash-flow", "/financial-statements"];

const TTTabs = () => {
  const location = useLocation();
  const ticker = useTicker();
  const theme = useTheme();
  const mt = `${theme.mixins.toolbar.minHeight}px`;
  const value = location.pathname.replace(/\/$/g, "");

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
          value={value}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons
          allowScrollButtonsMobile
        >
          {stockPaths.map((path) => {
            const label = sentenceCase(path.split("/")[1].replace(/-/g, " "));
            const value = `/stock/${ticker}${path}`;

            return (
              <Tab
                key={path}
                component={Link}
                to={`${value}${location.search}`}
                value={value}
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
