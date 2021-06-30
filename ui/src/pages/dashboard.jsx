import {
  Alert,
  Box,
} from "@material-ui/core";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "../hooks/useAuth";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import SpreadsheetTable from "../components/SavedSpreadsheets";
import SidePanel from "../components/SidePanel";

const tabs = [{
  title: "My Valuations",
  to: '/dashboard',
  content: <SpreadsheetTable />,
}];

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const [selectedTab, setSeletedTab] = useState(0);

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
          <SidePanel
            tabs={tabs}
            selectedTab={selectedTab}
            setSeletedTab={setSeletedTab}
          >
            {tabs[selectedTab].content}
          </SidePanel>
        </Box>
      )}
      {!isAuthenticated && (
        <Alert severity="info">Sign in to view your dashboard</Alert>
      )}
    </>
  );
};

export default Dashboard;
