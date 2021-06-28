import { Alert, Box, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "../hooks/useAuth";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import SpreadsheetTable from "../components/SpreadsheetTable";
import SidePanel from "../components/SidePanel/SidePanel";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>{getTitle("Dashboard")}</title>
        <link rel="canonical" href={`${resourceName}/dashboard`} />
        <meta name="description" content="Dashboard." />
      </Helmet>
      {isAuthenticated && (
        <Box
          sx={{
            display: "flex",
          }}
        >
          <SidePanel />
          <Box
            sx={{
              flexGrow: 1,
              padding: theme.spacing(1),
            }}
          >
            <Typography variant="h5" gutterBottom>
              My Spreadsheets
            </Typography>
            <SpreadsheetTable />
          </Box>
        </Box>
      )}
      {!isAuthenticated && (
        <Alert severity="info">Sign in to view your dashboard</Alert>
      )}
    </>
  );
};

export default Dashboard;
