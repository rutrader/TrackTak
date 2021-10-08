import React, { useEffect, useState } from "react";
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
import { grey, red } from "@material-ui/core/colors";
import { getPrice } from "../api/api";
import { useAuth } from "../hooks/useAuth";
import { formatPrice } from "../shared/utils";

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

const PricingPlan = ({
  subText,
  header,
  paperProps,
  buttonProps,
  listOfFeatures,
  priceId,
  handleOnClick,
}) => {
  const { getAccessToken } = useAuth();
  const [price, setPrice] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      const {
        data: { price },
      } = await getPrice(priceId, token?.jwtToken);

      setPrice(price);
    };

    fetchData();
  }, [getAccessToken, priceId]);

  return (
    <BoxPricingPlan>
      <Paper
        elevation={6}
        {...paperProps}
        sx={{
          boxShadow: "0 1px 6px rgb(60 64 67 / 30%)",
          borderRadius: "10px",
          alignItems: "center",
          textAlign: "center",
          flexDirection: "column",
          display: "flex",
          flex: "0 1 auto",
          padding: (theme) => `${theme.spacing(5)}  ${theme.spacing(2)} `,
          ...paperProps?.sx,
        }}
      >
        <Header>{header}</Header>
        <Box>
          {subText}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              sx={{
                color: (theme) => theme.palette.primary.mainTextColor,
                marginBottom: (theme) => theme.spacing(2),
                fontWeight: "bold",
                display: "flex",
              }}
              variant="h4"
            >
              {price &&
                formatPrice({
                  unitAmount: price.unit_amount,
                  currency: price.currency.toUpperCase(),
                })}
              <PriceBox>/{price?.recurring.interval}</PriceBox>
            </Typography>
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
        <SelectPlanButton {...buttonProps} onClick={handleOnClick}>
          Select plan
        </SelectPlanButton>
      </Paper>
    </BoxPricingPlan>
  );
};

export default PricingPlan;
