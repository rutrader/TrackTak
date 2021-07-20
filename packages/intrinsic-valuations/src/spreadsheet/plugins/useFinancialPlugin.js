import {
  FunctionPlugin,
  InvalidArgumentsError,
  SimpleRangeValue,
  ArraySize,
  HyperFormula,
} from "hyperformula";
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
import { useEffect } from "react";
import { isNil } from "lodash-es";
import convertStockAPIData from "../../shared/convertStockAPIData";
import { useDispatch, useSelector } from "react-redux";
import {
  getExchangeRatesThunk,
  getFundamentalsThunk,
  getLastPriceCloseThunk,
  getTenYearGovernmentBondLastCloseThunk,
} from "../../redux/thunks/stockThunks";
import { setFinancials } from "../../redux/actions/stockActions";
import selectFinancialsIsLoading from "../../selectors/stockSelectors/selectFinancialsIsLoading";
import selectFinancials from "../../selectors/stockSelectors/selectFinancials";

export const useFinancialPlugin = (spreadsheet, ticker) => {
  const isLoading = useSelector(selectFinancialsIsLoading);
  const financials = useSelector(selectFinancials);
  const dispatch = useDispatch();
  const {
    exchangeRates,
    financialStatements,
    currentEquityRiskPremium,
    currentIndustry,
    general,
    highlights,
    ...data
  } = financials;
  const {
    incomeStatements,
    balanceSheets,
    cashFlowStatements,
  } = financialStatements;

  useEffect(() => {
    const params = {
      to: "2019-07-20",
    };

    const fetchData = async (ticker) => {
      debugger;
      const fundamentals = await dispatch(
        getFundamentalsThunk({ ticker, params }),
      );

      const values = await Promise.all([
        dispatch(getExchangeRatesThunk(fundamentals, params)),
        dispatch(getTenYearGovernmentBondLastCloseThunk(fundamentals, params)),
        dispatch(getLastPriceCloseThunk(ticker, params)),
      ]);

      const financials = convertStockAPIData(...[fundamentals, ...values]);

      dispatch(setFinancials(financials));
    };

    if (ticker) {
      fetchData(ticker);
    }
  }, [dispatch, ticker]);

  useEffect(() => {
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
      ...data,
    };

    const historicalDataArrays = {
      incomeStatements: {
        yearly: Object.values(incomeStatements.yearly ?? {}),
      },
      balanceSheets: {
        yearly: Object.values(balanceSheets.yearly ?? {}),
      },
      cashFlowStatements: {
        yearly: Object.values(cashFlowStatements.yearly ?? {}),
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

        if (isLoading) {
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

          return ttmData[attribute] ?? "";
        }

        const startDate = args[1].value;
        const statementType = getTypeOfStatementToUse(attribute);

        if (args.length === 2) {
          if (attribute === "description") {
            return ttmData[attribute];
          }

          return (
            historicalDataArrays[statementType].yearly[startDate][attribute] ??
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
        if (isLoading) {
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

    if (isLoading && spreadsheet) {
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
    data,
    general,
    highlights,
    incomeStatements,
    isLoading,
    spreadsheet,
  ]);
};

const finTranslations = {
  enGB: {
    FIN: "FIN",
  },
};
