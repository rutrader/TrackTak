import React from "react";
import { Box } from "@material-ui/core";

export const InfoTextCostOfCapital = () => {
  return (
    <>
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
        <b>Country Equity Risk Premium</b> - Defined as the additional returns
        expected by the investor in order to assume the risk of investing in
        foreign markets as compared to the domestic country. This is set to the
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
    </>
  );
};

export const InfoTextValueDrivingInputs = () => {
  return (
    <>
      <Box>
        <b>Compound annual growth rate (CAGR)</b> - look at a. Revenue growth in
        your company in recent years b. Your company's revenues, relative to the
        overall market size and larger players in the sector.
      </Box>
      <Box>
        <b>Operating Income</b> - Start by looking at your company's current
        pre-tax operating margin but also look at the average for your industry.
      </Box>
      <Box>
        <b>Year of Convergence</b> - The forecast year in which the companies
        current Operating margin will converge on the target Operating margin.
      </Box>
      <Box>
        <b>Sales to Capital Ratio</b> - We compute how much the company is going
        to reinvest to keep the business growing in future years. The higher you
        set this number, the more efficiently the business is growing and the
        higher the value of your growth. You should look at the previous years
        sales to capital ratio's in the above table and the industry average for
        an idea of this value.
      </Box>
    </>
  );
};

export const InfoTextNormalDebt = () => {
  return (
    <>
      <Box>
        <b>Pre-tax Cost of Debt</b> - If you don't enter an input we will use a
        synthetic pre-tax cost of debt. You can override this by entering your
        own calculated pre-tax cost of debt here if you want.
      </Box>
      <Box>
        <b>Average Maturity of Debt</b> - Years until all of the companies
        outstanding debt matures on average. Generally found in the footnotes to
        the financial statements.
      </Box>
    </>
  );
};

export const InfoSyntheticRating = () => {
  return (
    <>
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
    </>
  );
};

export const InfoTextConvertibleDebt = () => {
  return (
    <>
      <Box>
        <b>Book Value of Convertible Debt</b> - Debt which is convertible to
        equity at some point in time. This is found in the financial statements.
      </Box>
      <Box>
        <b>Interest Expense on Convertible Debt</b> - The same as normal
        interest expense but for Convertible Debt. This is found in the
        financial statements.
      </Box>
      <Box>
        <b>Maturity of Convertible Debt</b> - The same as normal maturity of
        debt but for Convertible Debt. This is found in the financial
        statements.
      </Box>
    </>
  );
};

export const InfoTextPreferredStock = () => {
  return (
    <>
      <Box>
        <b>Number of Preferred Shares</b> - Shares of a company’s stock with
        dividends that are paid out to shareholders before common stock
        dividends are issued, i.e they have priority. This is found in the
        financial statements.
      </Box>
      <Box>
        <b>Market Price Per Share</b> - The same as normal price per share but
        for Preferred Stock. This is found in the financial statements.
      </Box>
      <Box>
        <b>Annual Dividend Per Share</b> - How much dividends are payed out on
        average per share each year. This is found in the financial statements.
      </Box>
    </>
  );
};

export const InfoTextEmployeeOptions = () => {
  return (
    <>
      <Box>
        <b>Employee Options Outstanding</b> - The same as shares outstanding but
        specifically for the employees options outstanding instead. If the
        company does have employee options outstanding, enter the total number
        here, vested and non vested, in the money and out of the money. This is
        found in the financial statements.
      </Box>
      <Box>
        <b>Average Strike Price</b> - Enter the weighted average strike price of
        the employee options outstanding. This is found in the financial
        statements.
      </Box>
      <Box>
        <b>Average Maturity</b> - The weighted average maturity of the employee
        options outstanding. This is found in the financial statements.
      </Box>
    </>
  );
};

export const InfoTextOther = () => {
  return (
    <>
      <Box>
        <b>Net Operating Loss (NOL)</b> - Any losses from the previous years
        that the company is carrying over to this year. It allows the company to
        reduce it's taxable income for the current year. This is found in the
        financial statements.
      </Box>
      <Box>
        <b>Probability of Failure</b> - Many young, growth companies fail,
        especially if they have trouble raising cash. Many distressed companies
        fail because they have trouble making debt payments. This is a tough
        input to estimate but try to use the agencies credit rating if the
        company has one, if not then use the synthetic credit rating default
        spread as a guide.
      </Box>
      <Box>
        <b>Proceeds as a Percentage of Book value</b> - If the company fails
        then sometimes there will be assets that get sold off (usually at fire
        sale prices) or cash left over to distribute to shareholders. This is
        only true if all liabilites have been paid first as shareholders are
        last in line if a company goes bankrupt. Sometimes however, companies
        will continue to run themselves into the ground with more debt to
        continue giving the executives a job and therefore will never have
        proceeds to distribute to shareholders.
      </Box>
    </>
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
