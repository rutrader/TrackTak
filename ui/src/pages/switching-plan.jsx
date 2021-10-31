import { Button, Typography } from "@material-ui/core";
import { Box, useTheme } from "@material-ui/system";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GlobeIconSvg from "../icons/globe.svg";
import { createCheckoutSession } from "../api/api";
import { useAuth } from "../hooks/useAuth";
import useFetchPrice from "../hooks/useFetchPrice";
import { formatPrice } from "../shared/utils";
import MembershipButtons from "../components/MembershipButtons";
import CancellationPlan from "../components/CancellationPlan";
import { worldwidePriceId } from "../data/regions";


const SwitchingPlan = () => {
  const theme = useTheme();
  const { getAccessToken } = useAuth();
  const priceData = useFetchPrice(worldwidePriceId);

  const handleOnClick = async () => {
    const token = await getAccessToken();
    const lineItems = [{ price: worldwidePriceId, quantity: 1 }];

    const { data } = await createCheckoutSession(lineItems, token?.jwtToken);

    window.location.href = data.url;
  };

  const formattedPrice = priceData ? (
    <>
      {formatPrice({
        unitAmount: priceData.unit_amount,
        currency: priceData.currency.toUpperCase(),
      })}
      /{priceData?.recurring.interval}
    </>
  ) : null;

  return (
    <>
      <CancellationPlan
        route="/account-settings"
        iconArrow={<ArrowBackIcon />}
        header="Consider switching to a worldwide API region."
        bodyText={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <GlobeIconSvg
              style={{
                height: "37px",
              }}
            />
            <Typography
              gutterBottom
              variant="h5"
              fontWeight="bold"
              sx={{ mt: 2 }}
            >
              Get global API region benefits for less
            </Typography>
            <Typography variant="h6">
              You will get all regions for only {formattedPrice}.
            </Typography>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                mt: 2,
                mb: 7,
                backgroundColor: theme.palette.primary.purple,
              }}
              onClick={handleOnClick}
            >
              Switch to Worldwide Region
            </Button>
          </Box>
        }
      />
      <MembershipButtons route="/cancel-plan" />
    </>
  );
};

export default SwitchingPlan;
