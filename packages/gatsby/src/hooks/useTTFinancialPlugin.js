import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createFinancialData, getFinancialData } from "../api/api";
import convertStockAPIData from "../../../packages/intrinsic-valuations/src/shared/convertStockAPIData";
import {
  getExchangeRatesThunk,
  getFundamentalsThunk,
  getLastPriceCloseThunk,
  getTenYearGovernmentBondLastCloseThunk,
} from "../../../packages/intrinsic-valuations/src/redux/thunks/stockThunks";
import { useAuth } from "./useAuth";

export const useTTFinancialPlugin = (spreadsheet) => {
  const [financialData, setFinancialData] = useState();
  const dispatch = useDispatch();
  const { getAccessToken } = useAuth();

  useEffect(() => {
    const { id, ticker } = spreadsheet?.financialData ?? {};

    const fetchData = async (callback) => {
      const { data } = await callback();

      setFinancialData(data.financialData);
    };

    if (id) {
      const fetchFinancials = async () => {
        return await getFinancialData(id);
      };

      fetchData(fetchFinancials);
    } else if (ticker) {
      const fetchCreateNewFinancials = async () => {
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

        return await createFinancialData(
          financialData,
          token?.jwtToken,
          spreadsheet._id,
        );
      };

      fetchData(fetchCreateNewFinancials);
    }
  }, [dispatch, getAccessToken, spreadsheet]);

  return financialData;
};
