# @tracktak/intrinsic-valuations

> A react package that allows external websites to use our intrinsic valuations for https://tracktak.com

For an example on how to use, please click here: https://github.com/TrackTak/tracktak-example

[![NPM](https://img.shields.io/npm/v/@tracktak/intrinsic-valuations.svg)](https://www.npmjs.com/package/@tracktak/intrinsic-valuations) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Prerequisites

- node >= v12.20.1
- To install the @tracktak/intrinsic-valuations package you must have created a personal access token on GitHub settings, see here: https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages

Once you have the token, edit your .npmrc file and add these two lines:

```
//npm.pkg.github.com/:_authToken={yourToken}
@tracktak:registry=https://npm.pkg.github.com/
```

## Install

```bash
npm install --save @tracktak/intrinsic-valuations
```

## Components

You don't need all of these components if you don't want.

For example FinancialsSummary can be removed if you have your own fundamentals page. See the example link at the top of this readme for more info.

- `<Provider store={reduxStore} theme?={materialUITheme} />`
- `<CompanyOverviewStats />`
- `<SensitivtyAnalysis />`
- `<FinancialsSummary />`
- `<IndustryAveragesResults />`
- `<CostOfCapitalResults SyntheticCreditRatingLink={fn: ReactNode} />`
- `<DiscountedCashFlowSheet />`

Provider is the only required component and can be added at the root of your app with your other providers. This component injects the redux store and material ui theme for the components. If you provide your own theme then it needs to come from material ui's createMuiTheme.

See here for the default theme: https://material-ui.com/customization/default-theme/

## Actions

You can use the following actions to set the tracktak state with your financial data:

- setFundamentals
- setTenYearGovernmentBondLastClose
- setLastPriceClose

See the example for a clearer picture on how to use these with the state below: https://github.com/TrackTak/tracktak-example

## State and props

We use redux to handle the state between the components in tracktak. This means that the components above don't have many props that have to be passed in them.

Here's the structure of our redux state that you need to pass into the store in the Provider above.
The below is an example from IRobot, but the principle/structure is the same for all stocks.

```js
{
  fundamentals: {
    governmentBondTenYearYield: 0.01577,
    priceLastClose: 120.5,
    general: {
      code: 'IRBT',
      name: 'iRobot Corporation',
      exchange: 'NASDAQ',
      currencyCode: 'USD',
      currencyName: 'US Dollar',
      currencySymbol: '$',
      countryISO: 'US',
      gicSubIndustry: 'Household Appliances'
    },
    highlights: {
      marketCapitalization: 3287169024,
      mostRecentQuarter: '2020-12-31'
    },
    sharesStats: {
      sharesOutstanding: 28199100
    },
    balanceSheet: {
      quarterly: {
        '2020-12-31': {
          totalStockholderEquity: 804434000,
          cash: 432635000,
          shortLongTermDebt: 0,
          longTermDebt: 0,
          capitalLeaseObligations: 50485000,
          shortTermInvestments: 51081000,
          noncontrollingInterestInConsolidatedEntity: 0,
          date: '2020-12-31'
        },
        '2020-09-30': {
          totalStockholderEquity: 781914000,
          cash: 297206000,
          shortLongTermDebt: 0,
          longTermDebt: 0,
          capitalLeaseObligations: 58240000,
          shortTermInvestments: 60130000,
          noncontrollingInterestInConsolidatedEntity: 0,
          date: '2020-09-30'
        },
        '2020-06-30': {
          totalStockholderEquity: 682062000,
          cash: 230734000,
          shortLongTermDebt: 0,
          longTermDebt: 0,
          capitalLeaseObligations: 59493000,
          shortTermInvestments: 11560000,
          noncontrollingInterestInConsolidatedEntity: 0,
          date: '2020-06-30'
        },
        '2020-03-31': {
          totalStockholderEquity: 616539000,
          cash: 248768000,
          shortLongTermDebt: 0,
          longTermDebt: 0,
          capitalLeaseObligations: 59994000,
          shortTermInvestments: 14759000,
          noncontrollingInterestInConsolidatedEntity: 0,
          date: '2020-03-31'
        },
      },
      yearly: {
        '2020-12-31': {
          totalStockholderEquity: 804434000,
          cash: 432635000,
          shortLongTermDebt: 0,
          longTermDebt: 0,
          capitalLeaseObligations: 50485000,
          shortTermInvestments: 51081000,
          noncontrollingInterestInConsolidatedEntity: 0,
          date: '2020-12-31'
        },
      }
    },
    incomeStatement: {
      quarterly: {
        '2020-12-31': {
          operatingIncome: 15270000,
          interestExpense: 0,
          incomeBeforeTax: 15026000,
          incomeTaxExpense: 1691000,
          totalRevenue: 544827000,
          date: '2020-12-31'
        },
        '2020-09-30': {
          operatingIncome: 80994000,
          interestExpense: 0,
          incomeBeforeTax: 123234000,
          incomeTaxExpense: 29982000,
          totalRevenue: 413145000,
          date: '2020-09-30'
        },
        '2020-06-30': {
          operatingIncome: 70283000,
          interestExpense: 0,
          incomeBeforeTax: 69899000,
          incomeTaxExpense: 11283000,
          totalRevenue: 279883000,
          date: '2020-06-30'
        },
        '2020-03-31': {
          operatingIncome: -20225000,
          interestExpense: 0,
          incomeBeforeTax: -20244000,
          incomeTaxExpense: -2109000,
          totalRevenue: 192535000,
          date: '2020-03-31'
        },
      },
      yearly: {
        '2020-12-31': {
          operatingIncome: 146322000,
          interestExpense: 0,
          incomeBeforeTax: 187915000,
          incomeTaxExpense: 40847000,
          totalRevenue: 1430390000,
          date: '2020-12-31'
        },
      }
    }
  }
}
```

None obvious fields explained:

`governmentBondTenYearYield` - The countries 10 year government bond yield. For example, if the stock is bases in the U.S then this will be the US 10 year treasury yield.

`priceLastClose` - The stock price.

`countryISO` - This must be a ISO 3166-1 alpha-2 country iso code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

We use this npm package internally: iso-3166-1-alpha-2.

`gicSubIndustry` - This must be a Global Industry Classification Standard Sub-Industry as seen in the column here: https://en.wikipedia.org/wiki/Global_Industry_Classification_Standard

The reason it must match one of these Sub-Industries specifically is because we map to our code internally to get the industry averages.

`mostRecentQuarter` - The most recent quarter financial sheet date that was released (balanceSheet/incomeStatement). For non-US stocks we currently don't support quarterly data on the balanceSheet or incomeStatement as our API provider does not. So for non-US stocks this field will just be the most recent yearly financial sheet date.

For now, the best way to use this package is to just dispatch our async thunks that we provide. These will make an API call to our API provider: EODHistoricalData.com and these thunks then populate the state.

`balanceSheet.shortLongTermDebt` - Interest bearing debt that is due within 12 months.

`balanceSheet.longTermDebt` - Interest bearing debt that is due after 12 months.

`balanceSheet.capitalLeaseObligations` - Leases on property or equipment that the company pays.

`balanceSheet.shortTermInvestments` - Investments that are highly liquid.

`balanceSheet.noncontrollingInterestInConsolidatedEntity` - If a company owns > 50% of another company they must consolidate the entire company on their financial statements. This field is the part of that that is not owned by the company.

This is the easiest way to use the library and still provide your own data, this is useful for SSR and also less API calls. If you want an even faster solution where you don't have to provide the above data then we can add our API thunks to to the package for you to call them or we can provide an iframe for you.

Any questions, please contact me at: martin@tracktak.com

## API calls

The package has a couple of API calls to our backend, currently it's just for the sensitivity analysis because it's an CPU intensive process but later on we will have others such as Monte-Carlo API calls.

## Final notes

Some stocks report financials in a different currency than their quote stock price. We are working on an currency exchange rate to make this easier for users of this package but this is not ready yet for this package just yet. It will be coming soon. For now if you need to do this you can convert the financials on your side and pass the converted data into the actions.

## License

You cannot use this package in any circumstance unless you have signed the 'SOFTWARE VAR AGREEMENT' contract we have provided you (or will provide).
