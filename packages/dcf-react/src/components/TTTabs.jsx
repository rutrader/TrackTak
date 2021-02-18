import { Box, Paper, Tab, Tabs, useTheme } from "@material-ui/core";
import React from "react";

const TTTabs = ({ currentValue, tabs, onClick }) => {
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
          value={currentValue}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons
          allowScrollButtonsMobile
        >
          {tabs.map(({ value, label }) => {
            return (
              <Tab
                key={value}
                value={value}
                label={label}
                onClick={(e) => onClick(value, e)}
              />
            );
          })}
        </Tabs>
      </Paper>
    </Box>
  );
};

export default TTTabs;
