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

- `<Provider store={reduxStore} theme?={materialUITheme} />`
- `<SensitivtyAnalysis />`
- `<Spreadsheet />`

Provider is the only required component and can be added at the root of your app with your other providers. This component injects the redux store and material ui theme for the components. If you provide your own theme then it needs to come from material ui's createMuiTheme.

See here for the default theme: https://material-ui.com/customization/default-theme/

Any questions, please contact me at: martin@tracktak.com

## API calls

The package has a couple of API calls to our backend, this is due to the spreadsheet having an api built into it, i.e =FIN().

## License

You cannot use this package in a production environment unless you have signed the 'SOFTWARE VAR AGREEMENT' contract we have provided you (or will provide) or a similar license agreement with us.
