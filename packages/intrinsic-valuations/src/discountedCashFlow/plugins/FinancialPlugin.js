import { FunctionPlugin, InvalidArgumentsError } from "hyperformula";
import matureMarketEquityRiskPremium from "../../shared/matureMarketEquityRiskPremium";

export const makeFinancialPlugin = ({
  incomeStatements,
  balanceSheets,
  cashFlowStatements,
  currentEquityRiskPremium,
  currentIndustry,
  ...financialData
}) => {
  const ttmData = {
    ...financialData,
    ...incomeStatements.ttm,
    ...balanceSheets.ttm,
    ...cashFlowStatements.ttm,
    ...currentEquityRiskPremium,
    ...currentIndustry,
    matureMarketEquityRiskPremium,
  };

  class FinancialPlugin extends FunctionPlugin {
    financial({ args }) {
      if (!args.length) {
        return new InvalidArgumentsError(1);
      }

      if (args.length === 1) {
        const attribute = args[0].expressionName;

        return ttmData[attribute] || 0;
      }
    }
  }

  FinancialPlugin.implementedFunctions = {
    FINANCIAL: {
      method: "financial",
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
