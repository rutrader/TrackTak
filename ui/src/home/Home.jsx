import { Box, Typography } from "@material-ui/core";
import React from "react";
import SearchTicker from "../components/SearchTicker";

const Home = () => {
  return (
    <Box
      sx={{
        justifyContent: "center",
        pt: 2.5,
        mb: 2,
        mt: "25%",
      }}
    >
      <Typography color="textPrimary" variant="h5" align="center" gutterBottom>
        Automate your DCF
      </Typography>
      <SearchTicker />
    </Box>
  );
};

export default Home;
