import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import FormatRawNumber from "./FormatRawNumber";
import FormatRawNumberToPercent from "./FormatRawNumberToPercent";
import { InfoOutlinedIconWrapper } from "./InfoOutlinedIconWrapper";
import { InfoTextCostOfCapital } from "./InfoText";
import BoldValueLabel from "./BoldValueLabel";
import selectRiskFreeRate from "../selectors/selectRiskFreeRate";
import selectCostOfCapital from "../selectors/selectCostOfCapital";

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
          <BoldValueLabel
            value={
              <FormatRawNumber
                decimalScale={2}
                value={fundamentals.currentIndustry.unleveredBeta}
              />
            }
            label="Unlevered Beta"
          />
          <BoldValueLabel
            value={
              <FormatRawNumber
                decimalScale={2}
                value={costOfCapital.leveredBetaForEquity}
              />
            }
            label="Levered Beta"
          />
          <BoldValueLabel
            value={
              <FormatRawNumberToPercent decimalScale={2} value={riskFreeRate} />
            }
            label="Riskfree Rate"
          />
          <BoldValueLabel
            value={
              <FormatRawNumberToPercent
                value={
                  fundamentals.currentEquityRiskPremiumCountry.equityRiskPremium
                }
              />
            }
            label="Country Equity Risk Premium"
          />
        </Box>
        <Box>
          <BoldValueLabel
            value={
              <FormatRawNumberToPercent
                value={fundamentals.matureMarketEquityRiskPremium}
              />
            }
            label="Mature Market Equity Risk Premium"
          />
          <BoldValueLabel
            value={
              <FormatRawNumberToPercent
                value={
                  fundamentals.currentEquityRiskPremiumCountry.corporateTaxRate
                }
              />
            }
            label="Marginal Tax Rate"
          />
          <BoldValueLabel
            value={
              <FormatRawNumberToPercent
                value={
                  fundamentals.incomeStatement
                    .pastThreeYearsAverageEffectiveTaxRate
                }
              />
            }
            label="Effective Tax Rate (Avg. past 3 yr)"
          />
        </Box>
      </Box>
    </>
  );
};

export default CostOfCapitalResults;
