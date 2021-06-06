import React from "react";
import { Box } from "@material-ui/core";

export const InfoTextCostOfCapital = () => {
  return (
    <React.Fragment>
      <Box>
        <b>Unlevered beta</b> - Is a measure of the market risk of the company
        relative to it's peers in the same industry without the impact of debt.
        This determines how much risk comes with owning a stock.
      </Box>
      <Box>
        <b>Levered beta</b> - Is a measure of market risk of the company
        relative to it's peers in the same industry including the impact of debt
        on the company. This determines how much risk comes with owning a stock.
      </Box>
      <Box>
        <b>Pre-tax Cost of Debt</b> - By default this is the synthetic credit
        rating pre-tax cost of debt that we have automatically calculated for
        you which is fine for most cases. If you manually input a cost of debt
        in the Normal Debt input field then it will overwrite this synthetic
        cost of debt.
      </Box>
      <Box>
        <b>Cost of Capital (WACC)</b> - The total cost of raising capital (cash)
        for the company, weighted by equity and debt.
      </Box>
      <Box>
        <b>Riskfree Rate</b> - Refers to the theoretical rate of return of an
        investment with zero risk.
      </Box>
      <Box>
        <b>Equity Risk Premium</b> - Defined as the additional returns expected
        by the investor in order to assume the risk of investing in foreign
        markets as compared to the domestic country. This is set to the
        companies operating country.
      </Box>
      <Box>
        <b>Mature Market Equity Risk Premium</b> - The return demanded by an
        investor for a stable market when they invest in the stock market over
        the risk-free rate. We use the U.S as our mature market ERP.
      </Box>
      <Box>
        <b>Marginal Tax Rate</b> - The theorteical tax rate paid on the next
        dollar of income. This is set to the operating countries corporation
        tax.
      </Box>
      <Box>
        <b>Effective Tax Rate</b> - The percent of income that a corporation
        pays in taxes. We use the past three years average.
      </Box>
    </React.Fragment>
  );
};

export const InfoSyntheticRating = () => {
  return (
    <React.Fragment>
      <Box>
        <b>Large/Small Company</b> - Large companies usually have stable
        earnings and less chance of defaulting on their debt. Smaller companies
        are usually risker, therefore they have higher costs of debts.
      </Box>
      <Box>
        <b>Interest Coverage</b> - How many times over a company can satisfy
        it's interest expenses with just it's operating income. A good interest
        coverage is usually above 5. Companies with volatile operating income
        can produce misleading interest coverages as they differ each year.
      </Box>
      <Box>
        <b>Estimated Bond Rating</b> - The estimated bond rating that we have
        worked out based on the companies interest coverage. It is similar to
        Moody's, S&amp;P and Fitch's ratings. We use our own synthetic credit
        rating because a lot of companies do not have any rating assigned by
        these agencies.
      </Box>
      <Box>
        <b>Estimated Company Default Spread</b> - The chance of a company
        defaulting on it's debts within a year.
      </Box>
      <Box>
        <b>Estimated Country Default Spread</b> - The chance of a country
        defaulting on it's debts within a year.
      </Box>
      <Box>
        <b>Estimated Pre-tax Cost of Debt</b> - The Synthetic Credit Rating
        pre-tax cost of debt that we have automatically calculated for you. This
        is used to work out the cost of capital.
      </Box>
    </React.Fragment>
  );
};

export const InfoTextBlackScholes = () => {
  return (
    <Box>
      Calculated from the inputs you entered in the Employee Options section. We
      use the Black Scholes methodology to work out the estimted market price
      per employee option. We then minus this from the 'Equity' cell in the
      Valuation Output (cell B34).
    </Box>
  );
};
