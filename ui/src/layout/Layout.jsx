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

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          maxWidth: "50%",
        }}
        className={classes.root}
      >
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          scrollButtons="auto"
        >
          {layoutPaths.map((path) => (
            <Tab label={path.split("/")[1]} />
          ))}
        </Tabs>
      </Paper>
    </Container>
  );
};

export default Layout;
