import React from "react";
import { Box, Typography } from "@material-ui/core";
import SubscribeMailingList from "../../../components/SubscribeMailingList";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import resourceName from "../../../shared/resourceName";
import {
  Section,
  selectGeneral,
  useTicker,
} from "@tracktak/intrinsic-valuations";
import DiscountedCashFlow from "../../../components/DiscountedCashFlow";
import { useSelector } from "react-redux";

const DiscountedCashFlowPage = () => {
  const general = useSelector(selectGeneral);
  const ticker = useTicker();

  return (
    <>
      <Helmet>
        <title>{getTitle(`${general.name} Discounted Cash Flow (DCF)`)}</title>
        <link
          rel="canonical"
          href={`${resourceName}/discounted-cash-flow/${ticker}`}
        />
        <meta
          name="description"
          content={`Do your own Automated DCF for ${general.name}. Based on Aswath Damodaran's excel spreadsheets.`}
        />
      </Helmet>
      <DiscountedCashFlow />
      <Section sx={{ display: "flex", mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
          }}
        >
          <Typography variant="h6" gutterBottom style={{ fontWeight: "bold" }}>
            Want us to implement features you need?
          </Typography>
          <SubscribeMailingList
            subscribeText="Join"
            locationSignup="Discounted Cash Flow"
          />
        </Box>
      </Section>
    </>
  );
};

export default DiscountedCashFlowPage;
