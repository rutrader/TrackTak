import { Box, Container } from "@material-ui/core";
import React from "react";
import { ReactComponent as TracktakLogo } from "../icons/tracktak.svg";

const LayoutHome = ({ children }) => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 2.5,
          mb: 2,
          mt: "25%",
        }}
      >
        <TracktakLogo width={300} height={50} />
      </Box>
      {children}
    </Container>
  );
};

export default LayoutHome;
