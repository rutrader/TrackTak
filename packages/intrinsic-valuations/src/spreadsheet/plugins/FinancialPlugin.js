import {
  FunctionPlugin,
  InvalidArgumentsError,
  SimpleRangeValue,
  ArraySize,
} from "hyperformula";
import matureMarketEquityRiskPremium from "../../shared/matureMarketEquityRiskPremium";
import dayjs from "dayjs";
import convertSubCurrencyToCurrency from "../../shared/convertSubCurrencyToCurrency";
import {
  balanceSheet,
  cashFlowStatement,
  dateFormat,
  getDatesFromStatements,
  getStatements,
  incomeStatement,
} from "../templates/financialStatements";

export const makeFinancialPlugin = (data) => {
  const {
    incomeStatements = {
      ttm: {},
      yearly: {},
    },
    balanceSheets = {
      ttm: {},
      yearly: {},
    },
    cashFlowStatements = {
      ttm: {},
      yearly: {},
    },
    currentEquityRiskPremium,
    currentIndustry,
    general,
    highlights,
    exchangeRates,
    ...financialData
  } = data;

  const lastExchangeRate = exchangeRates
    ? Object.values(exchangeRates)[0].close
    : 1;

  const dates = getDatesFromStatements(incomeStatements);

  const statements = [
    [null, ...dates],
    ["Income Statement"],
    ...getStatements(incomeStatements, incomeStatement),
    [""],
    ["Balance Sheet"],
    ...getStatements(balanceSheets, balanceSheet),
    [""],
    ["Cash Flow Statement"],
    ...getStatements(cashFlowStatements, cashFlowStatement),
  ];

  const ttmData = {
    ...financialData,
    ...incomeStatements.ttm,
    ...balanceSheets.ttm,
    ...cashFlowStatements.ttm,
    ...currentEquityRiskPremium,
    ...currentIndustry,
    ...general,
    ...highlights,
    lastExchangeRate,
    matureMarketEquityRiskPremium,
  };

  const historicalDataArrays = {
    incomeStatements: {
      yearly: Object.values(incomeStatements.yearly || {}),
    },
    balanceSheets: {
      yearly: Object.values(balanceSheets.yearly || {}),
    },
    cashFlowStatements: {
      yearly: Object.values(cashFlowStatements.yearly || {}),
    },
  };

  const getTypeOfStatementToUse = (attribute) => {
    if (incomeStatements.ttm[attribute]) {
      return "incomeStatements";
    }

    if (balanceSheets.ttm[attribute]) {
      return "balanceSheets";
    }

    if (cashFlowStatements.ttm[attribute]) {
      return "cashFlowStatements";
    }

    return null;
  };

  const getYearlyValues = (attribute, statementType, startDate, endDate) => {
    const startDateDayjs = dayjs(startDate);
    const endDateDayjs = dayjs(endDate);

    return historicalDataArrays[statementType].yearly
      .filter(({ date }) => {
        return dayjs(date).isBetween(startDateDayjs, endDateDayjs, "day", "[]");
      })
      .map((datum) => {
        let value = datum[attribute];

        if (attribute === "date") {
          value = dayjs(value).format(dateFormat);
        }

        return value;
      });
  };

  class FinancialPlugin extends FunctionPlugin {
    financial({ args }) {
      if (!args.length) {
        return new InvalidArgumentsError(1);
      }

      const attribute = args[0].value;

      // TODO: Add proper error checking here later
      if (args.length === 1) {
        if (attribute === "currencyCode") {
          const currencyCode = ttmData[attribute];

          return convertSubCurrencyToCurrency(currencyCode);
        }

        if (attribute === "financialStatements") {
          return SimpleRangeValue.onlyValues(statements);
        }

        return ttmData[attribute] || "";
      }

      const startDate = args[1].value;
      const statementType = getTypeOfStatementToUse(attribute);

      if (args.length === 2) {
        if (attribute === "description") {
          return ttmData[attribute];
        }

        return data[statementType].yearly[startDate][attribute] || "";
      }

      const endDate = args[2].value;

      if (args.length === 3) {
        return SimpleRangeValue.onlyValues([
          getYearlyValues(attribute, statementType, startDate, endDate),
        ]);
      }
    }
    financialSize({ args }) {
      const attribute = args[0].value;
      const statementType = getTypeOfStatementToUse(attribute);
      const startDate = args[1] ? args[1].value : null;
      const endDate = args[2] ? args[2].value : null;

      if (attribute === "financialStatements") {
        return new ArraySize(statements[0].length, statements.length);
      }

      if (args.length === 3) {
        const yearlyValues = getYearlyValues(
          attribute,
          statementType,
          startDate,
          endDate,
        );

        return new ArraySize(yearlyValues.length, 1);
      }

      return ArraySize.scalar();
    }
  }

  FinancialPlugin.implementedFunctions = {
    FINANCIAL: {
      method: "financial",
      arraySizeMethod: "financialSize",
    },
  };

  FinancialPlugin.aliases = {
    FIN: "FINANCIAL",
  };

  return FinancialPlugin;
};

export const finTranslations = {
  enGB: {
    FIN: "FIN",
  },
};
