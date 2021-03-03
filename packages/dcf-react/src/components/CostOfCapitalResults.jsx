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
import useInputQueryParams from "../hooks/useInputQueryParams";
import matureMarketEquityRiskPremium from "../shared/matureMarketEquityRiskPremium";
import selectRecentIncomeStatement from "../selectors/fundamentalSelectors/selectRecentIncomeStatement";
import selectCurrentIndustry from "../selectors/fundamentalSelectors/selectCurrentIndustry";
import selectCurrentEquityRiskPremium from "../selectors/fundamentalSelectors/selectCurrentEquityRiskPremium";
import StatsContainer from "./StatsContainer";
import { Link } from "../shared/gatsby";
import { useLocation } from "@reach/router";
import useInjectQueryParams from "../hooks/useInjectQueryParams";
import selectGeneral from "../selectors/fundamentalSelectors/selectGeneral";
import useVirtualExchange from "../hooks/useVirtualExchange";

const CostOfCapitalResults = () => {
  const theme = useTheme();
  const currentIndustry = useSelector(selectCurrentIndustry);
  const incomeStatement = useSelector(selectRecentIncomeStatement);
  const currentEquityRiskPremiumCountry = useSelector(
    selectCurrentEquityRiskPremium,
  );
  const general = useSelector(selectGeneral);
  const exchange = useVirtualExchange();
  const inputQueryParams = useInputQueryParams();
  const costOfCapital = useInjectQueryParams(selectCostOfCapital);
  const riskFreeRate = useSelector(selectRiskFreeRate);
  const pretaxCostOfDebt = useInjectQueryParams(selectPretaxCostOfDebt);
  const useQueryPretaxCostOfDebt =
    inputQueryParams.pretaxCostOfDebt !== undefined;
  const location = useLocation();
  const ticker = `${general.Code}-${exchange}`.toLowerCase();

  return (
    <React.Fragment>
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
        <StatsContainer>
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
                <Box>
                  {pretaxCostOfDebtLabel}&nbsp;
                  <Link
                    to={`/stock/${ticker}/synthetic-credit-rating${location.search}`}
                  >
                    (Synthetic Credit Rating)
                  </Link>
                </Box>
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
        </StatsContainer>
        <StatsContainer>
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
        </StatsContainer>
      </Box>
    </React.Fragment>
  );
};

export default CostOfCapitalResults;
