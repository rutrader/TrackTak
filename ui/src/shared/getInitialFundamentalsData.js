const getInitialFundamentalsData = (General, Highlights) => {
  return {
    General,
    Highlights,
    SharesStats: {},
    Financials: {
      Balance_Sheet: {
        yearly: {
          "2020-12-31": {},
        },
        quarterly: {
          [Highlights.MostRecentQuarter]: {},
        },
      },
      Cash_Flow: {
        yearly: {
          "2020-12-31": {},
        },
        quarterly: {
          [Highlights.MostRecentQuarter]: {},
        },
      },
      Income_Statement: {
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
