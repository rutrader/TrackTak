import { Box, Typography, useTheme, Link } from "@material-ui/core";
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
import selectThreeAverageYearsEffectiveTaxRate from "../selectors/fundamentalSelectors/selectThreeAverageYearsEffectiveTaxRate";
import selectCurrentIndustry from "../selectors/fundamentalSelectors/selectCurrentIndustry";
import selectCurrentEquityRiskPremium from "../selectors/fundamentalSelectors/selectCurrentEquityRiskPremium";
import StatsContainer from "./StatsContainer";
import { useLocation } from "@reach/router";
import useInjectQueryParams from "../hooks/useInjectQueryParams";
import { Link as RouterLink } from "../shared/gatsby";
import withFundamentalsLoaded from "../hoc/withFundamentalsLoaded";
import useTicker from "../hooks/useTicker";
import { isNil } from "lodash-es";

const DefaultSyntheticCreditRatingLink = ({
  ticker,
  searchParams,
  ...props
}) => (
  <Link
    component={RouterLink}
    to={`/stock/${ticker}/synthetic-credit-rating${searchParams}`}
    {...props}
  />
);

const CostOfCapitalResults = ({
  SyntheticCreditRatingLink = DefaultSyntheticCreditRatingLink,
}) => {
  const theme = useTheme();
  const currentIndustry = useSelector(selectCurrentIndustry);
  const currentEquityRiskPremiumCountry = useSelector(
    selectCurrentEquityRiskPremium,
  );
  const pastThreeYearsAverageEffectiveTaxRate = useSelector(
    selectThreeAverageYearsEffectiveTaxRate,
  );
  const ticker = useTicker();
  const inputQueryParams = useInputQueryParams();
  const costOfCapital = useInjectQueryParams(selectCostOfCapital);
  const riskFreeRate = useSelector(selectRiskFreeRate);
  const pretaxCostOfDebt = useInjectQueryParams(selectPretaxCostOfDebt);
  const useQueryPretaxCostOfDebt = !isNil(inputQueryParams.pretaxCostOfDebt);
  const location = useLocation();

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
                <Box component="span">
                  {pretaxCostOfDebtLabel}&nbsp;
                  <SyntheticCreditRatingLink
                    ticker={ticker}
                    searchParams={location.search}
                  >
                    (Synthetic Credit Rating)
                  </SyntheticCreditRatingLink>
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
            label="Equity Risk Premium"
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
                value={pastThreeYearsAverageEffectiveTaxRate}
              />
            }
            label="Effective Tax Rate (Avg. past 3 yr)"
          />
        </StatsContainer>
      </Box>
    </React.Fragment>
  );
};

export default withFundamentalsLoaded(CostOfCapitalResults);
