import React from "react";
import smallFirmsInterestSpreads from "../data/smallFirmsInterestSpreads.json";
import largeFirmsInterestSpreads from "../data/largeFirmsInterestSpreads.json";
import TTTable from "../components/TTTable";
import { Box, Typography, useTheme } from "@material-ui/core";
import Section from "../components/Section";

const SyntheticRatings = () => {
  const theme = useTheme();
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

  return (
    <Section>
      <Typography variant="h5" gutterBottom>
        Synthetic Ratings
      </Typography>
      <Box
        sx={{ display: "flex", flexWrap: "wrap", gridGap: theme.spacing(4) }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Large Firms</Typography>
          <TTTable
            columns={syntheticRatingColumns}
            data={largeFirmsInterestSpreads}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Smaller &amp; Riskier Firms</Typography>
          <TTTable
            columns={syntheticRatingColumns}
            data={smallFirmsInterestSpreads}
          />
        </Box>
      </Box>
    </Section>
  );
};

export default SyntheticRatings;
