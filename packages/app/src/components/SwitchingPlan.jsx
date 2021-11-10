import { Button, Typography } from "@material-ui/core";
import { Box, useTheme } from "@material-ui/system";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import globeSvg from "../assets/globe.svg";
import { createCheckoutSession } from "../api/api";
import { useAuth } from "../../../../tracktak-gatsby/src/hooks/useAuth";
import useFetchPrice from "../../../../tracktak-gatsby/src/hooks/useFetchPrice";
import { formatPrice } from "../../../../tracktak-gatsby/src/shared/utils";
import MembershipButtons from "../../../../tracktak-gatsby/src/components/MembershipButtons";
import CancellationPlan from "../components/CancellationPlan";
import { PriceIds } from "../data/regions";

const SwitchingPlan = () => {
  const theme = useTheme();
  const { getAccessToken } = useAuth();
  const priceData = useFetchPrice(PriceIds.WORLDWIDE);

  const handleOnClick = async () => {
    const token = await getAccessToken();
    const lineItems = [{ price: PriceIds.WORLDWIDE, quantity: 1 }];

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
            <img
              src={globeSvg}
              alt="worldwide"
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
