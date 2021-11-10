import { Box, IconButton, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import getTitle from "../../../../tracktak-gatsby/src/shared/getTitle";
import SavedSpreadsheets from "../components/SavedSpreadsheets";
import SearchTickerDialog from "../components/SearchTickerDialog";
import AddIcon from "@material-ui/icons/Add";
import withAuthentication from "../hocs/withAuthentication";

const Dashboard = () => {
  const [showSearchTickerDialog, setShowSearchTickerDialog] = useState(false);

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
      </Helmet>
      <SearchTickerDialog
        open={showSearchTickerDialog}
        onClose={handleCloseSearchTickerDialog}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          My Valuations
        </Typography>
        <IconButton
          sx={{
            ml: "auto",
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
      </Box>
      <SavedSpreadsheets onNewSpreadsheetClick={handleShowSearchTickerDialog} />
    </>
  );
};

export default withAuthentication(Dashboard);
