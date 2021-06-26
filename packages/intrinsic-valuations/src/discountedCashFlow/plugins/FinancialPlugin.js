import { FunctionPlugin, InvalidArgumentsError } from "hyperformula";

export const makeFinancialPlugin = (
  incomeStatements,
  balanceSheets,
  cashFlowStatements,
) => {
  class FinancialPlugin extends FunctionPlugin {
    fin({ args }) {
      if (!args.length) {
        return new InvalidArgumentsError(1);
      }

      if (args.length === 1) {
        const attribute = args[0].expressionName;
      }
    }
  }

  FinancialPlugin.implementedFunctions = {
    FIN: {
      method: "fin",
    },
  };

  return FinancialPlugin;
};

export const finTranslations = {
  enGB: {
    FIN: "FIN",
  },
};
