import { HyperFormula } from "hyperformula";
import { useEffect } from "react";
import { getFinancialPlugin } from "../spreadsheet/plugins/getFinancialPlugin";

export const useFinancialPlugin = (spreadsheet, financialData) => {
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
};
