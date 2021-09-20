import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import RoundButton from "./RoundButton";

export const generate = (element) => {
  return [0, 1, 2, 3].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
};

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

export const CustomBox = (props) => (
  <Box
    {...props}
    sx={{
      mt: 2,
      mb: 2,
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      "& > :not(style)": {
        m: 1,
        padding: (theme) => `${theme.spacing(5)}  ${theme.spacing(3)} `,
        position: "relative",
      },
    }}
  />
);

export const Header = (props) => (
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

export const PriceText = (props) => (
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

export const PriceBox = (props) => (
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
  />
);

export const CustomRoundButton = (props) => (
  <RoundButton
    {...props}
    variant="contained"
    sx={{
      lineHeight: 1,
      fontWeight: "bold",
      marginTop: "15px",
    }}
  >
    Select plan
  </RoundButton>
);

const PricingPlan = ({
  header,
  price,
  text,
  toggle,
  handleOnClickDisabled,
}) => {
  return (
    <CustomBox>
      <CustomPaper>
        <Header>{header}</Header>
        <Box>
          Starting from
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PriceText>
              {price}
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
                  <ListItemText primary={text} />
                </ListItem>,
              )}
            </List>
          </Grid>
        </Box>
        <CustomRoundButton onClick={handleOnClickDisabled} />
      </CustomPaper>
    </CustomBox>
  );
};

export default PricingPlan;
