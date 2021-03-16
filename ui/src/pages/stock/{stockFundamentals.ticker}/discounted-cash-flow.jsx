import React from "react";
import { Box, Typography, useTheme } from "@material-ui/core";
import SubscribeMailingList from "../../../components/SubscribeMailingList";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import resourceName from "../../../shared/resourceName";
import { graphql } from "gatsby";
import { Section, selectGeneral, useTicker } from "@tracktak/dcf-react";
import DiscountedCashFlow from "../../../components/DiscountedCashFlow";
import { useSelector } from "react-redux";

export const query = graphql`
  fragment Fundamentals on StockFundamentals {
    General {
      Code
      Name
      Exchange
      CurrencyCode
      CurrencyName
      CurrencySymbol
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

const DiscountedCashFlowPage = () => {
  const theme = useTheme();
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

export default DiscountedCashFlowPage;
