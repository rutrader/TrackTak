import React, { forwardRef } from "react";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@mui/icons-material/Clear";
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
import { navigate } from "gatsby";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { grey, red } from "@material-ui/core/colors";

const CustomPaper = ({ sx, ...props }) => (
  <Paper
    {...props}
    elevation={6}
    sx={{
      boxShadow: "0 1px 10px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
      borderRadius: "10px",
      alignItems: "center",
      textAlign: "center",
      flexDirection: "column",
      display: "flex",
      flex: "0 1 auto",
      ...sx,
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
        padding: (theme) => `${theme.spacing(5)}  ${theme.spacing(2)} `,
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
      fontSize: "1.8rem",
    }}
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
      fontSize: "1.8rem",
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

export const apiRegionsHashLink = "#Select-API-Regions";

const PricingPlan = ({ header, price, toggle, paperProps, listOfFeatures }) => {
  return (
    <CustomBox>
      <CustomPaper {...paperProps}>
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
              {listOfFeatures.map((feature, index) => {
                return (
                  <ListItem sx={{ paddingTop: "0px" }} key={index}>
                    <ListItemIcon sx={{ minWidth: "33px" }}>
                      {feature.disabled ? (
                        <ClearIcon sx={{ color: red[500] }} />
                      ) : (
                        <CheckIcon color="primary" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={feature.feature}
                      sx={{
                        color: feature.disabled ? grey[500] : false,
                      }}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Box>
        <CustomRoundButton
          component={forwardRef((props, ref) => (
            <AnchorLink {...props} gatsbyLinkProps={{ ref }} />
          ))}
          to={`/pricing${apiRegionsHashLink}`}
          onAnchorLinkClick={() => {
            navigate(`/pricing${apiRegionsHashLink}`);
          }}
        />
      </CustomPaper>
    </CustomBox>
  );
};

export default PricingPlan;
