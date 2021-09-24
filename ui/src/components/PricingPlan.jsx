import React, { forwardRef } from "react";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Divider,
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

const PaperPricingPlan = ({ sx, ...props }) => (
  <Paper
    elevation={6}
    sx={{
      boxShadow: "0 1px 6px rgb(60 64 67 / 30%)",
      borderRadius: "10px",
      alignItems: "center",
      textAlign: "center",
      flexDirection: "column",
      display: "flex",
      flex: "0 1 auto",
      padding: (theme) => `${theme.spacing(5)}  ${theme.spacing(2)} `,
      ...sx,
    }}
    {...props}
  />
);

export const BoxPricingPlan = (props) => (
  <Box
    sx={{
      mt: 2,
      mb: 2,
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      position: "relative",
      gap: "20px",
    }}
    {...props}
  />
);

export const Header = (props) => (
  <Typography
    sx={{
      color: (theme) => theme.palette.primary.purple,
      fontWeight: "bold",
      fontSize: "1.6rem",
    }}
    {...props}
    gutterBottom
  />
);

export const PriceText = (props) => (
  <Typography
    sx={{
      color: (theme) => theme.palette.primary.mainTextColor,
      marginBottom: (theme) => theme.spacing(2),
      fontWeight: "bold",
      display: "flex",
    }}
    {...props}
    variant="h4"
  />
);

export const PriceBox = (props) => (
  <Box
    sx={{
      fontSize: (theme) => theme.typography.fontSize2,
      color: (theme) => theme.palette.secondary.grey,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "4px",
      paddingTop: "8px",
    }}
    {...props}
  />
);

export const SelectPlanButton = ({ sx, children, ...props }) => (
  <RoundButton
    variant="outlined"
    sx={{
      lineHeight: 1,
      fontWeight: "bold",
      marginTop: "15px",
      ...sx,
    }}
    {...props}
  >
    {children}
  </RoundButton>
);

export const apiRegionsHashLink = "#Select-API-Regions";

const PricingPlan = ({
  header,
  price,
  toggle,
  paperProps,
  buttonProps,
  listOfFeatures,
}) => {
  return (
    <BoxPricingPlan>
      <PaperPricingPlan {...paperProps}>
        <Header>{header}</Header>
        <Box>
          Starting from
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PriceText>
              {price}
              {toggle ? <PriceBox>/year</PriceBox> : <PriceBox>/mo</PriceBox>}
            </PriceText>
          </Box>
          <Divider />
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
        <SelectPlanButton
          {...buttonProps}
          component={forwardRef((props, ref) => (
            <AnchorLink {...props} gatsbyLinkProps={{ ref }} />
          ))}
          to={`/pricing${apiRegionsHashLink}`}
          onAnchorLinkClick={() => {
            navigate(`/pricing${apiRegionsHashLink}`);
          }}
        >
          Select plan
        </SelectPlanButton>
      </PaperPricingPlan>
    </BoxPricingPlan>
  );
};

export default PricingPlan;
