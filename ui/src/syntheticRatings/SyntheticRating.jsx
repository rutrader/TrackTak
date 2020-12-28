import React from "react";
import smallFirmsInterestSpreads from "../data/smallFirmsInterestSpreads.json";
import largeFirmsInterestSpreads from "../data/largeFirmsInterestSpreads.json";
import TTTable from "../components/TTTable";
import { Box, Typography, useTheme } from "@material-ui/core";
import Section from "../components/Section";
import { useSelector } from "react-redux";
import FormatRawNumberToMillion from "../components/FormatRawNumberToMillion";
import BoldValueLabel from "../components/BoldValueLabel";

const thresholdMarketCap = 5000000000;

const SyntheticRating = () => {
  const theme = useTheme();
  const fundamentals = useSelector((state) => state.fundamentals);

  if (!fundamentals.data) return null;

  const {
    data: { General, Highlights },
  } = fundamentals;

  const syntheticRatingColumns = [
    {
      Header: "From",
      accessor: "from",
    },
    {
      Header: "To",
      accessor: "to",
    },
    {
      Header: "Rating",
      accessor: "rating",
    },
    {
      Header: "Spread",
      accessor: "spread",
    },
  ];

  // TODO: Calculate whether riskier firm based on these fields as well:
  // - Past Volatile Earnings
  // - Risky industry

  const isLargeCompany = Highlights.MarketCapitalization >= thresholdMarketCap;

  return (
    <Section>
      <Typography variant="h4" gutterBottom>
        {General.Name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Synthetic Rating Results
      </Typography>
      <Box>
        <BoldValueLabel
          value={
            <FormatRawNumberToMillion
              value={Highlights.MarketCapitalization}
              useCurrencySymbol
              suffix="m"
            />
          }
          label={`Market Capitalization (${
            isLargeCompany ? "Large Company" : "Small Company"
          })`}
        />
      </Box>
      <Section
        sx={{ display: "flex", flexWrap: "wrap", gridGap: theme.spacing(4) }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">
            Large Companies (&gt;=&nbsp;
            <FormatRawNumberToMillion
              useCurrencySymbol
              value={thresholdMarketCap}
              suffix="m"
            />
            &nbsp;Market Capitalization)
          </Typography>
          <TTTable
            columns={syntheticRatingColumns}
            data={largeFirmsInterestSpreads}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Smaller &amp; Riskier Companies</Typography>
          <TTTable
            columns={syntheticRatingColumns}
            data={smallFirmsInterestSpreads}
          />
        </Box>
      </Section>
    </Section>
  );
};

export default SyntheticRating;
