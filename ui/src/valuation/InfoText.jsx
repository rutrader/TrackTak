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
        <b>Riskfree Rate</b> - Refers to the theoretical rate of return of an
        investment with zero risk. Formula: today's 10yr annual government yield
        - the default spread for the government.
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
        pays in taxes. We use the past three years average. Formula: Effective
        tax rate = Taxes paid / Taxable income.
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
        <b>Earnings Before Interest and Taxes (EBIT)</b> - Start by looking at
        your company's current pre-tax operating margin but also look at the
        average for your industry.
      </Box>
      <Box>
        <b>Year of Convergence</b> - The forecast year in which the companies
        current EBIT margin will converge on the target EBIT margin.
      </Box>
      <Box>
        <b>Sales to Capital Ratio</b> - I compute how much you are going to
        reinvest to keep your business growing in future years. The higher you
        set this number, the more efficiently you are growing and the higher the
        value of your growth.
      </Box>
      <Box>
        <b>Pre-tax Cost of Debt</b> - Current, long term cost of borrowing
        money. If it has a credit rating from Moody's or similar then use it
        here.
      </Box>
    </>
  );
};

export const InfoTextNormalDebt = () => {
  return (
    <>
      <Box>
        <b>Average Maturity of Debt</b> - Generally found in the footnotes to
        the financial statements.
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
