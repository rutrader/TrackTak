import { createReducer } from "@reduxjs/toolkit";
import { getFinancials } from "../actions/financialsActions";

const initialState = {
  data: null,
  currentTotalInterestBearingDebt: null,
  totalInterestBearingDebts: null,
  currentCashAndMarketableSecurities: null,
  cashAndMarketableSecurities: null,
};

export const financialsReducer = createReducer(initialState, (builder) => {
  builder.addCase(getFinancials.fulfilled, (state, action) => {
    const financialsData = action.payload;
    const {
      balanceSheetHistory: { balanceSheetStatements },
      balanceSheetHistoryQuarterly: {
        balanceSheetStatements: balanceSheetStatementsQuarterly,
      },
    } = financialsData;

    state.data = financialsData;
    // TODO: Add capital leases when it's in API
    state.currentTotalInterestBearingDebt =
      balanceSheetStatementsQuarterly[0].longTermDebt.raw +
      balanceSheetStatementsQuarterly[0].shortLongTermDebt.raw;
    state.totalInterestBearingDebts = balanceSheetStatements.map(
      (statement) =>
        statement.longTermDebt.raw + statement.shortLongTermDebt.raw
    );
    state.currentCashAndMarketableSecurities =
      balanceSheetStatementsQuarterly[0].cash.raw +
      balanceSheetStatementsQuarterly[0].shortTermInvestments.raw;
    state.cashAndMarketableSecurities = balanceSheetStatements.map(
      (statement) => statement.cash.raw + statement.shortTermInvestments.raw
    );
  });
});
