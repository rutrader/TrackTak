import { Box, ListItem, Paper, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React, { useState } from "react";
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
import Chip from "@mui/material/Chip";
import SelectAPIRegion from "../components/SelectAPIRegion";
import PricingPlan, {
  PriceBox,
  CustomRoundButton,
  PriceText,
  CustomBox,
  Header,
} from "../components/PricingPlan";

const generate = (element) => {
  return [0, 1, 2, 3].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
};

const CustomPaperLarge = (props) => (
  <Paper
    elevation={6}
    {...props}
    sx={{
      boxShadow: "0 1px 10px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 20%)",
      borderRadius: "10px",
      alignItems: "center",
      textAlign: "center",
      flexDirection: "column",
      display: "flex",
      flex: "0 1 auto",
      height: "528px",
    }}
  />
);

const Pricing = () => {
  const theme = useTheme();
  const [toggle, setToggle] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleOnChangeToggle = (e) => {
    setToggle(e.target.checked);
  };

  const handleOnClickDisabled = () => {
    setDisabled(true);
  };

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
              onChange={handleOnChangeToggle}
              checked={toggle}
            />
            <Typography sx={{ fontSize: theme.typography.fontSize2 }}>
              Yearly
            </Typography>
          </Stack>
        </FormGroup>
      </Box>
      <CustomBox>
        <PricingPlan
          header="Professional Investor"
          price="$59.99"
          text="Priority email modelling support"
          toggle={toggle}
          handleOnClickDisabled={handleOnClickDisabled}
        />
        <CustomPaperLarge>
          <Chip
            label="Best value"
            color="primary"
            style={{
              fontWeight: "bold",
              position: "absolute",
              right: 0,
              top: 0,
              marginTop: "12px",
              marginRight: "8px",
              height: "28px",
            }}
          />
          <Header>Active Investor</Header>
          <Box>
            Starting from
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <PriceText>
                $34.99
                {toggle ? <PriceBox>/year</PriceBox> : <PriceBox>/mo</PriceBox>}
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
          <CustomRoundButton onClick={handleOnClickDisabled} />
        </CustomPaperLarge>
        <PricingPlan
          header="Non-Active Investor"
          price=" $19.99"
          text="Priority email modelling support"
          toggle={toggle}
          handleOnClickDisabled={handleOnClickDisabled}
        />
      </CustomBox>
      <SelectAPIRegion toggle={toggle} disabled={disabled} />
    </>
  );
};

export default Pricing;
