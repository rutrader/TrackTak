import { HyperFormula } from "hyperformula";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createFinancialData,
  getFinancialData,
} from "../../../../ui/src/api/api";
import { getAccessToken } from "../../../../ui/src/hooks/useAuth";
import {
  getExchangeRatesThunk,
  getFundamentalsThunk,
  getLastPriceCloseThunk,
  getTenYearGovernmentBondLastCloseThunk,
} from "../redux/thunks/stockThunks";
import convertStockAPIData from "../shared/convertStockAPIData";
import { getFinancialPlugin } from "../spreadsheet/plugins/getFinancialPlugin";

export const useFinancialPlugin = (spreadsheet, spreadsheetData) => {
  const [financialData, setFinancialData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const { id, ticker } = spreadsheetData?.financialData ?? {};

    if (id) {
      const fetchFinancials = async () => {
        const { data } = await getFinancialData(id);

        setFinancialData(data.financialData);
      };

      fetchFinancials();
    } else if (ticker) {
      const fetchData = async () => {
        const { payload: fundamentals } = await dispatch(
          getFundamentalsThunk({
            ticker,
          }),
        );

        const values = await Promise.all([
          dispatch(
            getExchangeRatesThunk({
              currencyCode: fundamentals.general.currencyCode,
              incomeStatement: fundamentals.incomeStatement,
              balanceSheet: fundamentals.balanceSheet,
            }),
          ),
          dispatch(
            getLastPriceCloseThunk({
              ticker,
            }),
          ),

          dispatch(
            getTenYearGovernmentBondLastCloseThunk({
              countryISO: fundamentals.general.countryISO,
            }),
          ),
          getAccessToken(),
        ]);

        const financialData = convertStockAPIData(
          fundamentals,
          values[0].payload,
          values[1].payload,
          values[2].payload,
        );

        const token = values[3];

        const { data } = await createFinancialData(
          financialData,
          token?.jwtToken,
          spreadsheetData._id,
        );

        setFinancialData(data.financialData);
      };

      fetchData();
    }
  }, [dispatch, spreadsheetData]);

  useEffect(() => {
    const FinancialPlugin = getFinancialPlugin(financialData);

    if (financialData && spreadsheet) {
      if (spreadsheet.hyperformula.getSheetNames().length > 0) {
        spreadsheet.hyperformula.rebuildAndRecalculate();

        spreadsheet.reset();
      }
    }

    return () => {
      // TODO: Causing SPILL error I think https://github.com/handsontable/hyperformula/issues/775
      HyperFormula.unregisterFunctionPlugin(FinancialPlugin);
    };
  }, [financialData, spreadsheet]);

  return financialData;
};
