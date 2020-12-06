import { Container } from "@material-ui/core";
import React from "react";
import TracktakLogo from "../shared/TracktakLogo";

const LayoutHome = ({ children }) => {
  return (
    <Container maxWidth="md">
      <TracktakLogo
        isLink={false}
        logoProps={{
          width: 300,
          height: 50,
        }}
        sx={{
          justifyContent: "center",
          pt: 2.5,
          mb: 2,
          mt: "25%",
        }}
      />
      {children}
    </Container>
  );
};

export default LayoutHome;
