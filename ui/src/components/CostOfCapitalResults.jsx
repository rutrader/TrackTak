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
import { pretaxCostOfDebtLabel } from "./OptionalInputs";
import selectPretaxCostOfDebt from "../selectors/selectPretaxCostOfDebt";
import selectQueryParams from "../selectors/selectQueryParams";
import { Link, useParams } from "react-router-dom";
import matureMarketEquityRiskPremium from "../shared/matureMarketEquityRiskPremium";

const CostOfCapitalResults = () => {
  const theme = useTheme();
  const fundamentals = useSelector((state) => state.fundamentals);
  const costOfCapital = useSelector(selectCostOfCapital);
  const riskFreeRate = useSelector(selectRiskFreeRate);
  const queryParams = useSelector(selectQueryParams);
  const pretaxCostOfDebt = useSelector(selectPretaxCostOfDebt);
  const useQueryPretaxCostOfDebt = queryParams.pretaxCostOfDebt !== undefined;
  const params = useParams();

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
            value={<FormatRawNumberToPercent value={pretaxCostOfDebt} />}
            label={
              useQueryPretaxCostOfDebt ? (
                `${pretaxCostOfDebtLabel} (Direct Input)`
              ) : (
                <>
                  {pretaxCostOfDebtLabel}&nbsp;
                  <Link to={`/synthetic-rating/${params.ticker}`}>
                    (Synthetic Rating)
                  </Link>
                </>
              )
            }
          />
          <BoldValueLabel
            value={
              <FormatRawNumberToPercent
                value={costOfCapital.totalCostOfCapital}
              />
            }
            label="Cost of Capital"
          />
          <BoldValueLabel
            value={
              <FormatRawNumberToPercent decimalScale={2} value={riskFreeRate} />
            }
            label="Riskfree Rate"
          />
        </Box>
        <Box>
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
          <BoldValueLabel
            value={
              <FormatRawNumberToPercent value={matureMarketEquityRiskPremium} />
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
