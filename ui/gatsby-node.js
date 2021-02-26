const fs = require("fs");
const path = require("path");

const fundamentalsDataDir = `${__dirname}/fundamentalsData`;
const fundamentalsData = fs
  .readdirSync(fundamentalsDataDir)
  .map((name) => require(path.join(fundamentalsDataDir, name)))[0];

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path === "/") {
    page.context.layout = "home";
    createPage(page);
  }

  if (page.path.match(/stock\//)) {
    page.context.layout = "fullscreen";

    createPage(page);
  }
};

exports.sourceNodes = ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  return [fundamentalsData].flatMap((arr) => {
    return arr.map((datum) => {
      const {
        General,
        Financials: { Balance_Sheet, Income_Statement },
        Highlights: { MarketCapitalization, MostRecentQuarter },
      } = datum;

      if (MostRecentQuarter === "0000-00-00") {
        return undefined;
      }

      const balanceSheet = {
        quarterly: {},
        yearly: {},
      };

      const incomeStatement = {
        quarterly: {},
        yearly: {},
      };

      Object.keys(Balance_Sheet).forEach((key) => {
        if (key.includes("quarterly")) {
          const current = Balance_Sheet[key];

          balanceSheet.quarterly[current.date] = current;
        }

        if (key.includes("yearly")) {
          const current = Balance_Sheet[key];

          balanceSheet.yearly[current.date] = current;
        }
      });

      Object.keys(Income_Statement).forEach((key) => {
        if (key.includes("quarterly")) {
          const current = Income_Statement[key];

          incomeStatement.quarterly[current.date] = current;
        }

        if (key.includes("yearly")) {
          const current = Income_Statement[key];

          incomeStatement.yearly[current.date] = current;
        }
      });

      return createNode({
        id: createNodeId(`${General.Code}-${General.Exchange}`),
        internal: {
          type: `StockFundamentals`,
          contentDigest: createContentDigest(datum),
        },
        Financials: {
          Balance_Sheet: {
            currency_symbol: Balance_Sheet.currency_symbol,
            ...balanceSheet,
          },
          Income_Statement: {
            currency_symbol: Income_Statement.currency_symbol,
            ...incomeStatement,
          },
        },
        Highlights: {
          MarketCapitalization,
          MostRecentQuarter,
        },
        General,
      });
    });
  });
};
