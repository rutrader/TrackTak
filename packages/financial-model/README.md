# @tracktak/financial-model

> A react package that allows external websites to use our intrinsic valuations for https://tracktak.com

For an example on how to use, please click here: https://github.com/TrackTak/tracktak-example

[![NPM](https://img.shields.io/npm/v/@tracktak/financial-model.svg)](https://www.npmjs.com/package/@tracktak/financial-model) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Prerequisites

- node >= v12.20.1
- To install the @tracktak/financial-model package you must have created a personal access token on GitHub settings, see here: https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages

Once you have the token, edit your .npmrc file and add these two lines:

```
//npm.pkg.github.com/:_authToken={yourToken}
@tracktak:registry=https://npm.pkg.github.com/
```

## Install

```bash
npm install --save @tracktak/financial-model
```

## Exports

- `<TracktakProvider store={TracktakStore} theme?={materialUITheme} />`
- `<Spreadsheet ticker={String} />`
- `createStore()`

- Provider is the only required component and can be added at the root of your app with your other providers. `store` needs to be the returned store from `createStore`. If you provide your own theme then it needs to come from material ui's createTheme.

See here for the default theme: https://material-ui.com/customization/default-theme/

Any questions please contact me at: martin@tracktak.com

### Spreadsheet props

- `ticker`: We only accept public stocks. We use EODHistoricalData.com internally for the API call so the ticker has to exist in their API to work.

If EodHistoricalData adds a ticker or an exchange then it will immediately work in our spreadsheet.

Here is a list of exchanges they support: https://eodhistoricaldata.com/financial-apis/exchanges-api-list-of-tickers-and-trading-hours/
Also see here for the ticker format: https://eodhistoricaldata.com/financial-apis/stock-etfs-fundamental-data-feeds

The ticker must be in dot notation, so for example: AAPL.US, RDW.LSE, PTL.AU etc

## API calls

The package has a couple of API calls to our backend, this is due to the spreadsheet having an api built into it, i.e =FIN().

## License

You cannot use this package in a production environment unless you have signed the 'SOFTWARE VAR AGREEMENT' contract we have provided you (or will provide) or a similar license agreement with us.
