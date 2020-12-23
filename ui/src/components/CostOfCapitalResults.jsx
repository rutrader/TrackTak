import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import calculateCostOfCapital from "../shared/calculateCostOfCapital";
import parseInputQueryParams from "../shared/parseInputQueryParams";
import FormatRawNumber from "./FormatRawNumber";
import FormatRawNumberToPercent from "./FormatRawNumberToPercent";

const CostOfCapitalResults = () => {
  const theme = useTheme();
  const industryAverages = useSelector((state) => state.industryAverages);
  const location = useLocation();
  const economicData = useSelector((state) => state.economicData);
  const fundamentals = useSelector((state) => state.fundamentals);
  const equityRiskPremium = useSelector((state) => state.equityRiskPremium);
  const inputQueryParams = parseInputQueryParams(location);
  const { SharesStats } = fundamentals.data;
  const riskFreeRate =
    economicData.governmentBondTenYearLastClose / 100 -
    equityRiskPremium.currentCountry.adjDefaultSpread;

  const { leveredBetaForEquity } = calculateCostOfCapital(
    fundamentals,
    inputQueryParams,
    SharesStats,
    equityRiskPremium,
    riskFreeRate,
    industryAverages.currentIndustry
  );

  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", gridColumnGap: "8px", flexWrap: "wrap" }}>
        <Typography>
          <Box
            component="span"
            sx={{ fontWeight: theme.typography.fontWeightBold }}
          >
            <FormatRawNumber
              decimalScale={2}
              value={industryAverages.currentIndustry.unleveredBeta}
            />
          </Box>
          &nbsp;Unlevered Beta
        </Typography>
        <Typography>
          <Box
            component="span"
            sx={{ fontWeight: theme.typography.fontWeightBold }}
          >
            <FormatRawNumber decimalScale={2} value={leveredBetaForEquity} />
          </Box>
          &nbsp;Levered Beta
        </Typography>
        <Typography>
          <Box
            component="span"
            sx={{ fontWeight: theme.typography.fontWeightBold }}
          >
            <FormatRawNumberToPercent decimalScale={2} value={riskFreeRate} />
          </Box>
          &nbsp;Riskfree Rate
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gridColumnGap: "8px", flexWrap: "wrap" }}>
        <Typography>
          <Box
            component="span"
            sx={{ fontWeight: theme.typography.fontWeightBold }}
          >
            <FormatRawNumberToPercent
              value={equityRiskPremium.currentCountry.equityRiskPremium}
            />
          </Box>
          &nbsp;Country Equity Risk Premium
        </Typography>
        <Typography>
          <Box
            component="span"
            sx={{ fontWeight: theme.typography.fontWeightBold }}
          >
            <FormatRawNumberToPercent
              value={equityRiskPremium.matureMarketEquityRiskPremium}
            />
          </Box>
          &nbsp;Mature Market Equity Risk Premium
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gridColumnGap: "8px", flexWrap: "wrap" }}>
        <Typography>
          <Box
            component="span"
            sx={{ fontWeight: theme.typography.fontWeightBold }}
          >
            <FormatRawNumberToPercent
              value={equityRiskPremium.currentCountry.corporateTaxRate}
            />
          </Box>
          &nbsp;Marginal Tax Rate
        </Typography>
        <Typography>
          <Box
            component="span"
            sx={{ fontWeight: theme.typography.fontWeightBold }}
          >
            <FormatRawNumberToPercent
              value={
                fundamentals.incomeStatement
                  .pastThreeYearsAverageEffectiveTaxRate
              }
            />
          </Box>
          &nbsp;Effective Tax Rate (Avg. past 3 yr)
        </Typography>
      </Box>
    </Box>
  );
};

export default CostOfCapitalResults;
