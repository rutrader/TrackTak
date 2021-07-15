import { Alert, Box, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "../hooks/useAuth";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import SavedSpreadsheets from "../components/SavedSpreadsheets";
import SidePanel from "../components/SidePanel";
import AddIcon from "@material-ui/icons/Add";
import { saveSpreadsheet } from "../api/api";
import { navigate } from "gatsby";
import SearchTickerDialog from "../components/SearchTickerDialog";

const tabs = (handleShowSearchTickerDialog) => [
  {
    title: "My Valuations",
    to: "/dashboard",
    content: (
      <SavedSpreadsheets onNewSpreadsheetClick={handleShowSearchTickerDialog} />
    ),
  },
];

const Dashboard = () => {
  const { isAuthenticated, getAccessToken, userData } = useAuth();
  const [selectedTab, setSeletedTab] = useState(0);
  const [showSearchTickerDialog, setShowSearchTickerDialog] = useState(false);

  const handleSearchClick = async (ticker) => {
    const token = await getAccessToken();
    const response = await saveSpreadsheet(
      { name: ticker, data: {}, type: "DCF" },
      token?.jwtToken,
    );
    navigate(`/${userData.sub}/my-spreadsheets/${response.data._id}`);
  };

  const handleShowSearchTickerDialog = () => {
    setShowSearchTickerDialog(true);
  };

  const handleCloseSearchTickerDialog = () => {
    setShowSearchTickerDialog(false);
  };

  return (
    <>
      <Helmet>
        <title>{getTitle("Dashboard")}</title>
        <link rel="canonical" href={`${resourceName}/dashboard`} />
        <meta name="description" content="Dashboard." />
      </Helmet>
      <SearchTickerDialog
        open={showSearchTickerDialog}
        onSearchResultClick={handleSearchClick}
        onClose={handleCloseSearchTickerDialog}
      />
      {isAuthenticated && (
        <Box
          sx={{
            display: "flex",
          }}
        >
          <SidePanel
            tabs={tabs(handleShowSearchTickerDialog)}
            selectedTab={selectedTab}
            setSeletedTab={setSeletedTab}
            titleMenuButtons={
              <IconButton
                sx={{
                  padding: 0,
                  backgroundColor: (theme) => theme.palette.primary.light,
                  width: "40px",
                  height: "40px",
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.dark,
                  },
                }}
                onClick={handleShowSearchTickerDialog}
              >
                <AddIcon style={{ color: "white" }} fontSize="large" />
              </IconButton>
            }
          >
            {tabs(handleShowSearchTickerDialog)[selectedTab].content}
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
