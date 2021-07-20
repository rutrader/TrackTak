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

## Exports

- `<TracktakProvider store={TracktakStore} theme?={materialUITheme} />`
- `<Spreadsheet ticker={String} />`

- Provider is the only required component and can be added at the root of your app with your other providers. `store` needs to be the returned store from `createStore`. If you provide your own theme then it needs to come from material ui's createMuiTheme.

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

## To Note

- Later on we will be removing the React dependency and making this a pure javascript library.
- The spreadsheet will add the input props to the url so that it can be deep linked into, i.e this part of the url: `?cagrInYears_1_5=11%25&ebitTargetMarginInYear_10=11%25&salesToCapitalRatio=1.71&yearOfConvergence=2`.

Apologies is this isn't what you want, we are removing it soon and switching to user accounts with unique hash id's like Google Sheets. If this is a big problem in using this library then we can remove it immediately for you.

## Branding

Please insert 'powered by tracktak.com' with tracktak.com being a link or similar linked text somewhere near the spreadsheet.

## License

You cannot use this package in a production environment unless you have signed the 'SOFTWARE VAR AGREEMENT' contract we have provided you (or will provide) or a similar license agreement with us.
