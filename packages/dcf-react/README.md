# @tracktak/dcf-react

> A react package that allows external websites to use our discounted cash flow calculator for https://tracktak.com

[![NPM](https://img.shields.io/npm/v/@tracktak/dcf-react.svg)](https://www.npmjs.com/package/@tracktak/dcf-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @tracktak/dcf-react
```

## Security

In the source code you will see we apply the `sandbox` attribute to make the iFrame secure. This removes all access that we do not need and makes it secure to use in your website. See here for more info: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe

## Usage Example

```jsx
import React, { Component } from "react";

import { DCFIframe } from "@tracktak/dcf-react";

const YourComponent = ({ ticker }) => {
  return (
    <DCFIFrame
      ticker={ticker}
      sourceDomain="FinancialModellingPrep.com"
  />
}
```

`ticker` - The ticker for the stock to display the DCF for. It must be in the format `EXCHANGE.SYMBOL`, for example AAPL.US, IAG.LSE etc.

The US is a virtual exchange that covers all US exchanges, for the full list of exchanges see the Exchange Code column here: https://eodhistoricaldata.com/financial-apis//list-supported-exchanges/

`sourceDomain` - Optional prop. The domain of your website. We need this to do any specific modifications to the DCF for your specific iFrame if you want that. You will need to tell us what this parameter is specifically if supply it so we can modify our DCF for your iFrame.

`params` - Optional prop. Pass extra parameters through the url. One option for this to pass all of the inputs through the url to automatically fill out in the input boxes, like so: `cagrYearOneToFive=0.18&ebitTargetMarginInYearTen=0.1&yearOfConvergence=3&salesToCapitalRatio=2.5`.

Here is a full list of extra params we accept that fill out the input boxes in the DCF:

- `cagrYearOneToFive`
- `ebitTargetMarginInYearTen`
- `yearOfConvergence`
- `salesToCapitalRatio`
- `numberOfEmployeeOptionsOutstanding`
- `averageStrikePrice`
- `averageMaturityOfOptions`
- `averageMaturityOfDebt`
- `pretaxCostOfDebt`
- `bookValueOfConvertibleDebt`
- `interestExpenseOnConvertibleDebt`
- `maturityOfConvertibleDebt`
- `numberOfPreferredShares`
- `marketPricePerShare`
- `annualDividendPerShare`
- `netOperatingLoss`
- `probabilityOfFailure`
- `proceedsAsAPercentageOfBookValue`

`style` - Optional prop. A style object to apply any styles to the iFrame.

## License

MIT © [tracktak](https://github.com/tracktak)
