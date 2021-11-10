import { useTheme } from "@emotion/react";
import { Box, Container } from "@material-ui/core";
import { Link } from "gatsby";
import React from "react";
import Header, { LinkButton } from "../components/Header";
import { signInLink } from "../../../packages/common/src/shared/getHeaderLinks";
import { useAuth } from "../hooks/useAuth";

const LayoutHome = ({ children }) => {
  const theme = useTheme();

  const { isAuthenticated } = useAuth();
  const links = [];

  if (!isAuthenticated) {
    links.push(signInLink);
  }

  return (
    <Container maxWidth="xl">
      <Header hideSearch>
        <Box
          sx={{
            marginRight: "-24px",
            marginTop: "-4px",
            marginBottom: "-4px",
          }}
        >
          <LinkButton
            to="sign-up"
            component={Link}
            variant="contained"
            sx={{ color: theme.palette.primary.contrastText, flexGrow: 1 }}
          >
            Go to Spreadsheet
          </LinkButton>
        </Box>
      </Header>
      {children}
    </Container>
  );
};

export default LayoutHome;
