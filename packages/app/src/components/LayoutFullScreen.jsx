import { Box } from "@material-ui/system";
import React from "react";
import Header from "../components/Header";
import { useAuth } from "../../../../tracktak-gatsby/src/hooks/useAuth";
import { getHeaderLinks } from "../../../common/src/shared/getHeaderLinks";

const LayoutFullScreen = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const links = getHeaderLinks(isAuthenticated);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header position="relative" links={links} />
      {children}
    </Box>
  );
};

export default LayoutFullScreen;
