import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Box } from "@material-ui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import { useAuth } from "../hooks/useAuth";
import { formatPrice } from "../shared/utils";
import { getPrice } from "../api/api";

const ListAPIRegion = ({
  iconSvg,
  regionName,
  checked,
  handleOnChangeChecked,
  disabled,
  priceId,
}) => {
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.up("sm"));
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
    <Box>
      <Grid item xs={12}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                paddingTop: 0,
                paddingBottom: 0,
                flexWrap: "wrap",
                justifyContent: "left",
              }}
              onClick={handleOnChangeChecked}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    height: "30px",
                  }}
                >
                  {iconSvg}
                </ListItemIcon>
                <ListItemText primary={regionName} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  justifyContent: isOnMobile ? "right" : "center",
                  marginLeft: "16px",
                  marginRight: "-11px",
                  alignItems: "center",
                }}
              >
                {price &&
                  formatPrice({
                    unitAmount: price.unit_amount,
                    currency: price.currency.toUpperCase(),
                  })}
                /{price?.recurring.interval}
                <Checkbox
                  edge="end"
                  checked={checked}
                  sx={{ marginRight: "-12px" }}
                  inputProps={{ "aria-label": "controlled" }}
                  disabled={disabled}
                />
              </Box>
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
    </Box>
  );
};

export default ListAPIRegion;
