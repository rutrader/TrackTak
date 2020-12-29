import React from "react";
import TTTable from "../components/TTTable";
import { Box, Typography, useTheme } from "@material-ui/core";
import Section from "../components/Section";
import { useSelector } from "react-redux";
import FormatRawNumberToMillion from "../components/FormatRawNumberToMillion";
import BoldValueLabel from "../components/BoldValueLabel";
import selectThresholdMarketCap from "../selectors/selectThresholdMarketCap";
import selectInterestCoverage from "../selectors/selectInterestCoverage";
import FormatRawNumber from "../components/FormatRawNumber";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";
import selectIsLargeCompany from "../selectors/selectIsLargeCompany";
import selectEstimatedCostOfDebt from "../selectors/selectEstimatedCostOfDebt";
import selectInterestSpread from "../selectors/selectInterestSpread";
import smallCompaniesInterestSpreads from "../data/smallCompaniesInterestSpreads.json";
import largeCompaniesInterestSpreads from "../data/largeCompaniesInterestSpreads.json";
import { InfoSyntheticRating } from "../components/InfoText";
import { InfoOutlinedIconWrapper } from "../components/InfoOutlinedIconWrapper";

const SyntheticRating = () => {
  const theme = useTheme();
  const fundamentals = useSelector((state) => state.fundamentals);
  const thresholdMarketCap = useSelector(selectThresholdMarketCap);
  const interestCoverage = useSelector(selectInterestCoverage);
  const isLargeCompany = useSelector(selectIsLargeCompany);
  const interestSpread = useSelector(selectInterestSpread);
  const estimatedCostOfDebt = useSelector(selectEstimatedCostOfDebt);

  if (!fundamentals.isLoaded) return null;

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
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {fundamentals.data.General.Name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        <InfoOutlinedIconWrapper text={<InfoSyntheticRating />}>
          Synthetic Rating Results
        </InfoOutlinedIconWrapper>
      </Typography>
      <Box>
        <Typography style={{ fontWeight: theme.typography.fontWeightBold }}>
          {isLargeCompany ? "Large Company" : "Small Company"}
        </Typography>
        <BoldValueLabel
          value={
            interestCoverage === Infinity || interestCoverage === -Infinity ? (
              interestCoverage
            ) : (
              <FormatRawNumber value={interestCoverage} />
            )
          }
          label="Interest Coverage"
        />
        <BoldValueLabel
          value={interestSpread.rating}
          label="Estimated Bond Rating"
        />
        <BoldValueLabel
          value={<FormatRawNumberToPercent value={interestSpread.spread} />}
          label="Estimated Company Default Spread"
        />
        <BoldValueLabel
          value={
            <FormatRawNumberToPercent
              value={
                fundamentals.currentEquityRiskPremiumCountry.adjDefaultSpread
              }
            />
          }
          label="Estimated Country Default Spread"
        />
        <BoldValueLabel
          value={<FormatRawNumberToPercent value={estimatedCostOfDebt} />}
          label="Estimated Pre-tax Cost of Debt"
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
            data={largeCompaniesInterestSpreads}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Smaller &amp; Riskier Companies</Typography>
          <TTTable
            columns={syntheticRatingColumns}
            data={smallCompaniesInterestSpreads}
          />
        </Box>
      </Section>
    </>
  );
};

export default SyntheticRating;
