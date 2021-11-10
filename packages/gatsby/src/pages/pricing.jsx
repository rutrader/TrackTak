import { Box, Link, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import FormGroup from "@material-ui/core/FormGroup";
import SelectAPIRegion from "../components/SelectAPIRegion";
import FrequentlyAskedQuestion from "../components/FrequentlyAskedQuestion";
import { createCheckoutSession } from "../api/api";
import { useAuth } from "../hooks/useAuth";
import withAuthentication from "../hocs/withAuthentication";
import { PriceIds } from "../data/regions";
import useCurrentPlan from "../hooks/useCurrentPlan";

const Pricing = () => {
  const theme = useTheme();
  const { getAccessToken } = useAuth();
  const { currentPlan } = useCurrentPlan();
  const [checked, setChecked] = useState([]);
  const [disabled, setDisabled] = useState([]);

  const handleOnClick = async () => {
    const token = await getAccessToken();
    const apiRegionLineItems = checked
      .filter((priceId) => priceId !== PriceIds.MEDIUM_CAP_US_PLUS)
      .map((priceId) => {
        return { price: priceId, quantity: 1 };
      });
    const lineItems = [...apiRegionLineItems];
    const { data } = await createCheckoutSession(lineItems, token?.jwtToken);

    window.location.href = data.url;
  };

  useEffect(() => {
    if (currentPlan?.priceIds) {
      const currentStocks = [
        PriceIds.MEDIUM_CAP_US_PLUS,
        ...currentPlan?.priceIds,
      ];
      setChecked(currentStocks);
      setDisabled(currentStocks);
    }
  }, [currentPlan]);

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
          Plans and Pricing
        </Typography>
        <Typography
          sx={{
            color: theme.palette.primary.mainTextColor,
            marginBottom: theme.spacing(2),
          }}
          variant="h4"
        >
          Choose a region that works for you.
        </Typography>
        <FormGroup>
          <Typography
            sx={{ marginTop: theme.spacing(2) }}
            color="textSecondary"
          >
            For business plans are only available by contacting sales:{" "}
            <Link href="mailto:support@tracktak.com">support@tracktak.com</Link>
            .
          </Typography>
        </FormGroup>
      </Box>
      <SelectAPIRegion
        disabled={disabled}
        checked={checked}
        setChecked={setChecked}
        handleOnClick={handleOnClick}
      />
      <FrequentlyAskedQuestion />
    </>
  );
};

export default withAuthentication(Pricing);
