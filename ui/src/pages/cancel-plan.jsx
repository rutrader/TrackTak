import { useTheme } from "@emotion/react";
import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@material-ui/core";
import { Box } from "@material-ui/system";
import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PersonIcon from "@mui/icons-material/Person";
import CheckIcon from "@material-ui/icons/Check";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { navigate } from "gatsby-link";

const listOfFeatures = [
  { feature: "Small-cap United States API region access" },
  { feature: "Mid-cap United States API region access" },
  { feature: "Access to Worldwide API region" },
  { feature: "Priority email and call support" },
];

const CancelPlan = () => {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title>{getTitle("Cancelling Plan")}</title>
      </Helmet>
      <Box>
        <IconButton
          color="primary"
          onClick={() => {
            navigate("/switching-plan");
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
          We are sorry to see you go!
        </Typography>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "column",
            mb: 4,
          }}
        >
          <Typography gutterBottom variant="h5" fontWeight="bold">
            Please confirm the cancellation of your plan
          </Typography>
          <Box sx={{ display: "flex" }}>
            <WarningAmberIcon sx={{ color: theme.palette.warning.main }} />
            <Typography gutterBottom sx={{ color: theme.palette.warning.main }}>
              Your benefits will remain active until your billing period ends on
              Thur, 14 October 2021.
            </Typography>
          </Box>
          <Typography
            gutterBottom
            variant="h6"
            fontWeight="bold"
            sx={{ mt: 4 }}
          >
            Benefits you will lose:
          </Typography>
          <List>
            {listOfFeatures.map((feature, index) => {
              return (
                <ListItem sx={{ paddingTop: "0px" }} key={index}>
                  <ListItemIcon sx={{ minWidth: "33px" }}>
                    <CheckIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={feature.feature} />
                </ListItem>
              );
            })}
          </List>
        </Grid>
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
          >
            End My Membership
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default CancelPlan;
