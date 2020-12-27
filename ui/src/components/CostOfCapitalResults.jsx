import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectCostOfCapital } from "../selectors/calculateCostOfCapital";
import FormatRawNumber from "./FormatRawNumber";
import FormatRawNumberToPercent from "./FormatRawNumberToPercent";
import { InfoOutlinedIconWrapper } from "./InfoOutlinedIconWrapper";
import { InfoTextCostOfCapital } from "./InfoText";
import { selectRiskFreeRate } from "../selectors/calculateRiskFreeRate";

const CostOfCapitalResults = () => {
  const theme = useTheme();
  const fundamentals = useSelector((state) => state.fundamentals);
  const costOfCapital = useSelector(selectCostOfCapital);
  const riskFreeRate = useSelector(selectRiskFreeRate);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        <InfoOutlinedIconWrapper text={<InfoTextCostOfCapital />}>
          Cost of Capital Results
        </InfoOutlinedIconWrapper>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gridColumnGap: theme.spacing(3),
        }}
      >
        <Box>
          <Typography>
            <Box
              component="span"
              sx={{ fontWeight: theme.typography.fontWeightBold }}
            >
              <FormatRawNumber
                decimalScale={2}
                value={fundamentals.currentIndustry.unleveredBeta}
              />
            </Box>
            &nbsp;Unlevered Beta
          </Typography>
          <Typography>
            <Box
              component="span"
              sx={{ fontWeight: theme.typography.fontWeightBold }}
            >
              <FormatRawNumber
                decimalScale={2}
                value={costOfCapital.leveredBetaForEquity}
              />
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
          <Typography>
            <Box
              component="span"
              sx={{ fontWeight: theme.typography.fontWeightBold }}
            >
              <FormatRawNumberToPercent
                value={
                  fundamentals.currentEquityRiskPremiumCountry.equityRiskPremium
                }
              />
            </Box>
            &nbsp;Country Equity Risk Premium
          </Typography>
        </Box>
        <Box>
          <Typography>
            <Box
              component="span"
              sx={{ fontWeight: theme.typography.fontWeightBold }}
            >
              <FormatRawNumberToPercent
                value={fundamentals.matureMarketEquityRiskPremium}
              />
            </Box>
            &nbsp;Mature Market Equity Risk Premium
          </Typography>
          <Typography>
            <Box
              component="span"
              sx={{ fontWeight: theme.typography.fontWeightBold }}
            >
              <FormatRawNumberToPercent
                value={
                  fundamentals.currentEquityRiskPremiumCountry.corporateTaxRate
                }
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
    </>
  );
};

export default CostOfCapitalResults;
