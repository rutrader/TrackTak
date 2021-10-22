import { Button, IconButton, Stack, Typography } from "@material-ui/core";
import { Box, useTheme } from "@material-ui/system";
import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PersonIcon from "@mui/icons-material/Person";
import { navigate } from "gatsby-link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListAPIRegion from "../components/ListAPIRegion";
import GlobeIconSvg from "../icons/globe.svg";
import SelectAPIRegion from "../components/SelectAPIRegion";

const SwitchingPlan = () => {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title>{getTitle("Switching Plan")}</title>
      </Helmet>
      <Box>
        <IconButton
          color="primary"
          onClick={() => {
            navigate("/account-settings");
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: "2.3rem",
            mb: 4,
          }}
          color={theme.palette.primary.purple}
          fontWeight="bold"
          gutterBottom
        >
          Before you go, consider switching to a Worldwide region.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h6" fontWeight="bold">
            Get all API regions for less
          </Typography>
          <Typography>
            You will get all the benefits of Active Investor for only $35/month.
          </Typography>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              mt: 2,
              mb: 4,
              backgroundColor: theme.palette.primary.purple,
            }}
          >
            Switch to Worldwide Region
          </Button>
        </Box>
        <Stack
          spacing={2}
          direction="row"
          sx={{ justifyContent: "space-around", flexWrap: "wrap", gap: 2 }}
        >
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
            }}
            startIcon={<PersonIcon />}
          >
            Keep My Benefits
          </Button>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
            }}
            startIcon={<AcUnitIcon />}
          >
            Freeze Payment Plan
          </Button>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
            }}
            onClick={() => {
              navigate("/cancel-plan");
            }}
          >
            End My Membership
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default SwitchingPlan;
