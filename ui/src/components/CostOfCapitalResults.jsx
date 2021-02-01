import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import FormatRawNumber from "./FormatRawNumber";
import FormatRawNumberToPercent from "./FormatRawNumberToPercent";
import { InfoOutlinedIconWrapper } from "./InfoOutlinedIconWrapper";
import { InfoTextCostOfCapital } from "./InfoText";
import BoldValueLabel from "./BoldValueLabel";
import selectRiskFreeRate from "../selectors/fundamentalSelectors/selectRiskFreeRate";
import selectCostOfCapital from "../selectors/fundamentalSelectors/selectCostOfCapital";
import { pretaxCostOfDebtLabel } from "./OptionalInputs";
import selectPretaxCostOfDebt from "../selectors/fundamentalSelectors/selectPretaxCostOfDebt";
import selectQueryParams from "../selectors/routerSelectors/selectQueryParams";
import { Link, useParams } from "react-router-dom";
import matureMarketEquityRiskPremium from "../shared/matureMarketEquityRiskPremium";
import selectRecentIncomeStatement from "../selectors/fundamentalSelectors/selectRecentIncomeStatement";
import selectCurrentIndustry from "../selectors/fundamentalSelectors/selectCurrentIndustry";
import selectCurrentEquityRiskPremium from "../selectors/fundamentalSelectors/selectCurrentEquityRiskPremium";

const CostOfCapitalResults = () => {
  const theme = useTheme();
  const currentIndustry = useSelector(selectCurrentIndustry);
  const incomeStatement = useSelector(selectRecentIncomeStatement);
  const currentEquityRiskPremiumCountry = useSelector(
    selectCurrentEquityRiskPremium
  );
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
                value={currentIndustry.unleveredBeta}
              />
            }
            label="Unlevered Beta"
          />
          <BoldValueLabel
            value={
              <FormatRawNumber
                decimalScale={2}
                value={costOfCapital.leveredBeta}
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
                  <Link to={`/synthetic-credit-rating/${params.ticker}`}>
                    (Synthetic Credit Rating)
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
                value={currentEquityRiskPremiumCountry.equityRiskPremium}
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
                value={currentEquityRiskPremiumCountry.marginalTaxRate}
              />
            }
            label="Marginal Tax Rate"
          />
          <BoldValueLabel
            value={
              <FormatRawNumberToPercent
                value={incomeStatement.pastThreeYearsAverageEffectiveTaxRate}
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
