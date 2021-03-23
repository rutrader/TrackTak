const getInitialFundamentalsData = () => {
  const mostRecentQuarter = "2020-12-31";

  return {
    general: {
      countryISO: "US",
      gicSubIndustry: "Application Software",
    },
    highlights: {
      mostRecentQuarter,
    },
    sharesStats: {},
    balanceSheet: {
      yearly: {
        [mostRecentQuarter]: {
          date: mostRecentQuarter,
        },
      },
      quarterly: {
        [mostRecentQuarter]: {
          date: mostRecentQuarter,
        },
      },
    },
    incomeStatment: {
      yearly: {
        [mostRecentQuarter]: {
          date: mostRecentQuarter,
        },
      },
      quarterly: {
        [mostRecentQuarter]: {
          date: mostRecentQuarter,
        },
      },
    },
  };
};

export default getInitialFundamentalsData;
