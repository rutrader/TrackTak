# @tracktak/dcf-react

> A react package that allows external websites to use our discounted cash flow calculator for https://tracktak.com

For an example on how to use, please click here:

[![NPM](https://img.shields.io/npm/v/@tracktak/dcf-react.svg)](https://www.npmjs.com/package/@tracktak/dcf-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @tracktak/dcf-react
```

## Prerequisites

- node >= v12.20.1

## Components

Each component has jsdoc comments on it which describes the props and what it does. See that for more information.
You don't need all of these components if you don't want.

For example PastFundamentals can be removed if you have your own fundamentals page.

- <CompanyOverviewStats />
- <PastFundamentals />
- <ValueDrivingInputs />
- <OptionalInputs />
- <IndustryAveragesResults />
- <CostOfCapitalResults SyntheticCreditRatingLink={fn: ReactNode} />
- <BlackScholesResults />
- <DiscountedCashFlowSheet />
- <Provider store={reduxStore} theme?={materialUITheme} />

Provider can be added at the root of your app with your other providers. This component injects the redux store and material ui theme for the components. If you provide your own theme then it needs to come from material ui's createMuiTheme.

Here's the provider's code:

```js
const Provider = ({ children, store, theme = muiTheme }) => {
  return (
    <ThemeProvider theme={theme}>
      <ReactReduxProvider store={store}>{children}</ReactReduxProvider>
    </ThemeProvider>
  );
};
```

You can see that you can provide your own theme to the provider which will overwrite our default one.

Here's our default theme:

```js
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  palette: {
    primary: {
      light: "#2fdbab",
      main: "#43cea2",
      dark: "#38ab87",
      contrastText: "#fff",
    },
    secondary: {
      light: "#7849BF",
      main: "#51509C",
      dark: "#41407d",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiAccordion: {
      styleOverrides: {
        rounded: {
          borderRadius: "4px",
        },
      },
    },
  },
});
```

## State and props

We use redux to handle the state between the components in tracktak. This means that the components above don't have many props that have to be passed in them. We get our data from EODHistoricalData.com so our state structure mostly matches the return value from their fundamentals endpoint: `eodhistoricaldata.com/api/fundamentals`.

Here's the structure of our redux state that you need to comply to:

```js

```

For now, the best way to use this package is to just dispatch our async thunks that we provide. These will make an API call to our API provider: EODHistoricalData.com and these thunks then populate the state.

The thunks we provide are:

- getLastPriceCloseThunk -> Gets the last closing price for the stock from the API
- getFundamentalsThunk -> Gets the full fundamentals such as General, Highlights, Financials. It also sets the exchangeRates if it's an international stock.
- getTenYearGovernmentBondLastCloseThunk -> Gets the stocks address countries ten year government bond closing price.

In the future we will make our data more efficient so you can provide your own data instead of relying on our API calls to fill the components.
The issue with this currently is that we have data such as the companies industry, country ISO and exchange rates which must be of a specific format due to how we calculate stuff like equityRiskPremiums.
