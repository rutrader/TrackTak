import {
  FunctionPlugin,
  InvalidArgumentsError,
  SimpleRangeValue,
  ArraySize,
  HyperFormula,
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
import { useSelector } from "react-redux";
import selectCashFlowStatements from "../../selectors/stockSelectors/selectCashFlowStatements";
import selectIncomeStatements from "../../selectors/stockSelectors/selectIncomeStatements";
import selectBalanceSheets from "../../selectors/stockSelectors/selectBalanceSheets";
import selectCurrentEquityRiskPremium from "../../selectors/stockSelectors/selectCurrentEquityRiskPremium";
import selectPrice from "../../selectors/stockSelectors/selectPrice";
import selectRiskFreeRate from "../../selectors/stockSelectors/selectRiskFreeRate";
import selectSharesOutstanding from "../../selectors/stockSelectors/selectSharesOutstanding";
import selectThreeAverageYearsEffectiveTaxRate from "../../selectors/stockSelectors/selectThreeAverageYearsEffectiveTaxRate";
import selectCurrentIndustry from "../../selectors/stockSelectors/selectCurrentIndustry";
import selectEstimatedCostOfDebt from "../../selectors/stockSelectors/selectEstimatedCostOfDebt";
import selectGeneral from "../../selectors/stockSelectors/selectGeneral";
import selectHighlights from "../../selectors/stockSelectors/selectHighlights";
import selectExchangeRates from "../../selectors/stockSelectors/selectExchangeRates";
import selectIsStockLoaded from "../../selectors/stockSelectors/selectisStockLoaded";
import { useEffect } from "react";
import { isNil } from "lodash-es";

export const useFinancialPlugin = (spreadsheet) => {
  const isStockLoaded = useSelector(selectIsStockLoaded);
  const incomeStatements = useSelector(selectIncomeStatements);
  const balanceSheets = useSelector(selectBalanceSheets);
  const cashFlowStatements = useSelector(selectCashFlowStatements);
  const currentEquityRiskPremium = useSelector(selectCurrentEquityRiskPremium);
  const price = useSelector(selectPrice);
  const riskFreeRate = useSelector(selectRiskFreeRate);
  const sharesOutstanding = useSelector(selectSharesOutstanding);
  const pastThreeYearsAverageEffectiveTaxRate = useSelector(
    selectThreeAverageYearsEffectiveTaxRate,
  );
  const currentIndustry = useSelector(selectCurrentIndustry);
  const estimatedCostOfDebt = useSelector(selectEstimatedCostOfDebt);
  const general = useSelector(selectGeneral);
  const highlights = useSelector(selectHighlights);
  const exchangeRates = useSelector(selectExchangeRates);

  useEffect(() => {
    const lastExchangeRate =
      exchangeRates && exchangeRates[0] ? exchangeRates[0].close : 1;

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
      ...incomeStatements.ttm,
      ...balanceSheets.ttm,
      ...cashFlowStatements.ttm,
      ...currentEquityRiskPremium,
      ...currentIndustry,
      ...general,
      ...highlights,
      riskFreeRate,
      estimatedCostOfDebt,
      pastThreeYearsAverageEffectiveTaxRate,
      price,
      sharesOutstanding,
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
      if (!isNil(incomeStatements.ttm[attribute])) {
        return "incomeStatements";
      }

      if (!isNil(balanceSheets.ttm[attribute])) {
        return "balanceSheets";
      }

      if (!isNil(cashFlowStatements.ttm[attribute])) {
        return "cashFlowStatements";
      }
    };

    const getYearlyValues = (attribute, statementType, startDate, endDate) => {
      const startDateDayjs = dayjs(startDate);
      const endDateDayjs = dayjs(endDate);

      return historicalDataArrays[statementType].yearly
        .filter(({ date }) => {
          return dayjs(date).isBetween(
            startDateDayjs,
            endDateDayjs,
            "day",
            "[]",
          );
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

        if (!isStockLoaded) {
          return "Loading...";
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

          return (
            historicalDataArrays[statementType].yearly[startDate][attribute] ||
            ""
          );
        }

        const endDate = args[2].value;

        if (args.length === 3) {
          return SimpleRangeValue.onlyValues([
            getYearlyValues(attribute, statementType, startDate, endDate),
          ]);
        }
      }
      financialSize({ args }) {
        if (!isStockLoaded) {
          return ArraySize.scalar();
        }

        const attribute = args[0].value;
        const statementType = getTypeOfStatementToUse(attribute);
        const startDate = args[1] ? args[1].value : null;
        const endDate = args[2] ? args[2].value : null;

        if (attribute === "financialStatements") {
          return ArraySize.fromArray(statements);
        }

        if (args.length === 3) {
          const yearlyValues = getYearlyValues(
            attribute,
            statementType,
            startDate,
            endDate,
          );

          return ArraySize.fromArray([yearlyValues]);
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

    HyperFormula.registerFunctionPlugin(FinancialPlugin, finTranslations);

    if (isStockLoaded && spreadsheet) {
      if (spreadsheet.hyperformula.getSheetNames().length > 0) {
        spreadsheet.hyperformula.rebuildAndRecalculate();

        spreadsheet.reset();
      }
    }

    return () => {
      // TODO: Causing SPILL error I think https://github.com/handsontable/hyperformula/issues/775
      HyperFormula.unregisterFunctionPlugin(FinancialPlugin);
    };
  }, [
    balanceSheets,
    cashFlowStatements,
    currentEquityRiskPremium,
    currentIndustry,
    estimatedCostOfDebt,
    exchangeRates,
    general,
    highlights,
    incomeStatements,
    isStockLoaded,
    pastThreeYearsAverageEffectiveTaxRate,
    price,
    riskFreeRate,
    sharesOutstanding,
    spreadsheet,
  ]);
};

const finTranslations = {
  enGB: {
    FIN: "FIN",
  },
};
