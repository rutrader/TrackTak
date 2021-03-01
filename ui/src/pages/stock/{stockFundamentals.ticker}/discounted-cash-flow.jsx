import React from "react";
import { Box, Typography, useTheme } from "@material-ui/core";
import Section from "../../../components/Section";
import SubscribeMailingList from "../../../components/SubscribeMailingList";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import selectGeneral from "../../../selectors/fundamentalSelectors/selectGeneral";
import resourceName from "../../../shared/resourceName";
import useVirtualExchange from "../../../hooks/useVirtualExchange";
import { graphql } from "gatsby";

export const query = graphql`
  fragment Fundamentals on StockFundamentals {
    General {
      Code
      Name
      Exchange
      CurrencyCode
      CurrencyName
      CurrencySymbol
      CountryName
      CountryISO
      Industry
      Description
    }
    Highlights {
      MostRecentQuarter
      MarketCapitalization
    }
    ticker
  }

  query DiscountedCashFlowQuery($ticker: String) {
    stockFundamentals(ticker: { eq: $ticker }) {
      ...Fundamentals
    }
  }
`;

const DiscountedCashFlow = () => {
  const theme = useTheme();
  const general = useSelector(selectGeneral);
  const exchange = useVirtualExchange();

  return (
    <>
      <Helmet>
        <title>{getTitle(`${general.Name} Discounted Cash Flow (DCF)`)}</title>
        <link
          rel="canonical"
          href={`${resourceName}/discounted-cash-flow/${general.Code}.${exchange}`}
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
          <Typography
            variant="h6"
            gutterBottom
            style={{ fontWeight: theme.typography.fontWeightBold }}
          >
            Want us to implement features you need?
          </Typography>
          <SubscribeMailingList
            subscribeText="Sign Up"
            locationSignup="Discounted Cash Flow"
          />
        </Box>
      </Section>
    </>
  );
};

export default DiscountedCashFlow;
