const getInitialFundamentalsData = (General, Highlights) => {
  return {
    General,
    Highlights,
    SharesStats: {},
    Financials: {
      Balance_Sheet: {
        currency_symbol: General.CurrencyCode,
        yearly: {
          "2020-12-31": {},
        },
        quarterly: {
          [Highlights.MostRecentQuarter]: {},
        },
      },
      Cash_Flow: {
        currency_symbol: General.CurrencyCode,
        yearly: {
          "2020-12-31": {},
        },
        quarterly: {
          [Highlights.MostRecentQuarter]: {},
        },
      },
      Income_Statement: {
        currency_symbol: General.CurrencyCode,
        yearly: {
          "2020-12-31": {},
        },
        quarterly: {
          [Highlights.MostRecentQuarter]: {},
        },
      },
    },
  };
};

export default getInitialFundamentalsData;
