import React from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";

const Home = () => {
  return (
    <>
      <Box mt={8}>
        <Typography color="textPrimary" variant="h4">
          Enter the stocks ticker
        </Typography>
        <Box display="flex" mt={0.5} mb={1.5}>
          <TextField variant="filled" label="e.g. AMZN" fullWidth />
          <Button color="primary" variant="contained">
            SUBMIT
          </Button>
        </Box>
      </Box>
      <Typography color="textSecondary">
        * This must be a yahoo finance ticker
      </Typography>
    </>
  );
};

export default Home;
