import { Box, ListItem, Paper, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import { Stack } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import RoundButton from "../components/RoundButton";
import Chip from "@mui/material/Chip";

function generate(element) {
  return [0, 1, 2, 3].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const CustomPaper = (props) => (
  <Paper
    elevation={6}
    {...props}
    sx={{
      boxShadow: "0 1px 10px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
      borderRadius: "10px",
      alignItems: "center",
      textAlign: "center",
      flexDirection: "column",
      display: "flex",
      flex: "0 1 auto",
    }}
  />
);

const HeaderText = (props) => (
  <Typography
    {...props}
    sx={{
      color: (theme) => theme.palette.primary.purple,
      fontWeight: "bold",
    }}
    variant="h4"
    gutterBottom
  />
);

const PriceText = (props) => (
  <Typography
    {...props}
    sx={{
      color: (theme) => theme.palette.primary.mainTextColor,
      marginBottom: (theme) => theme.spacing(2),
      fontWeight: "bold",
      display: "flex",
    }}
    variant="h4"
  />
);

const PriceBox = (props) => (
  <Box
    {...props}
    sx={{
      fontSize: (theme) => theme.typography.fontSize2,
      color: "#7B8A98",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "4px",
      paddingTop: "8px",
    }}
  >
    /mo
  </Box>
);

const CustomRoundButton = (props) => (
  <RoundButton
    {...props}
    variant="contained"
    sx={{
      lineHeight: 1,
      fontWeight: "bold",
      marginTop: "15px",
    }}
  >
    Get Started
  </RoundButton>
);

const Pricing = () => {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title>{getTitle("Pricing")}</title>
        <link rel="canonical" href={`${resourceName}/pricing`} />
        <meta name="description" content="Pricing Plan." />
      </Helmet>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          color={theme.palette.primary.purple}
          fontWeight="bold"
          variant="h3"
          gutterBottom
        >
          Our Pricing Plan
        </Typography>
        <Typography
          sx={{
            color: theme.palette.primary.mainTextColor,
            marginBottom: theme.spacing(2),
          }}
          variant="h4"
        >
          Choose your plan. Try it free for 7 days.
        </Typography>
        <FormGroup>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Typography sx={{ fontSize: theme.typography.fontSize2 }}>
              Monthly
            </Typography>
            <Switch
              defaultChecked
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography sx={{ fontSize: theme.typography.fontSize2 }}>
              Yearly
            </Typography>
          </Stack>
        </FormGroup>
      </Box>
      <Box
        sx={{
          mt: 2,
          mb: 2,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 3,
          "& > :not(style)": {
            m: 1,
            // width: 400,
            // height: 500,
            padding: `${theme.spacing(4)}  ${theme.spacing(3)} `,
            position: "relative",
          },
        }}
      >
        <CustomPaper>
          <HeaderText>Professional Investor</HeaderText>
          <Box>
            Starting from
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <PriceText>
                $59.99
                <PriceBox />
              </PriceText>
            </Box>
            <Grid item xs={12}>
              <List>
                {generate(
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: "33px" }}>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Priority email modelling support" />
                  </ListItem>,
                )}
              </List>
            </Grid>
          </Box>
          <CustomRoundButton />
        </CustomPaper>
        <CustomPaper>
          <Chip
            label="Best value"
            color="primary"
            style={{
              fontWeight: "bold",
              position: "absolute",
              right: 0,
              top: 0,
              marginTop: "8px",
              marginRight: "8px",
              height: "28px",
            }}
          />
          <HeaderText>Active Investor</HeaderText>
          <Box>
            Starting from
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <PriceText>
                $34.99
                <PriceBox />
              </PriceText>
            </Box>
            <Grid item xs={12}>
              <List>
                {generate(
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: "33px" }}>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Priority email modelling support" />
                  </ListItem>,
                )}
              </List>
            </Grid>
          </Box>
          <CustomRoundButton />
        </CustomPaper>
        <CustomPaper>
          <HeaderText>Non-Active Investor</HeaderText>
          <Box>
            Starting from
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <PriceText>
                $19.99
                <PriceBox />
              </PriceText>
            </Box>
            <Grid item xs={12}>
              <List>
                {generate(
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: "33px" }}>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Priority email modelling support" />
                  </ListItem>,
                )}
              </List>
            </Grid>
          </Box>
          <CustomRoundButton />
        </CustomPaper>
      </Box>
      {/* <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CustomPaper>
          <HeaderText>Professional Investor</HeaderText>
          <Box>
            Starting from
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <PriceText>
                $59.99
                <PriceBox />
              </PriceText>
            </Box>
            <Grid item xs={12}>
              <List>
                {generate(
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: "33px" }}>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Priority email modelling support" />
                  </ListItem>,
                )}
              </List>
            </Grid>
          </Box>
          <CustomRoundButton />
        </CustomPaper>
      </Box> */}
    </>
  );
};

export default Pricing;
