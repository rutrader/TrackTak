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

  const getPropertyFromOneOfStatements = (attribute, date) => {
    return (
      incomeStatements.yearly[date][attribute] ||
      balanceSheets.yearly[date][attribute] ||
      cashFlowStatements.yearly[date][attribute] ||
      0
    );
  };

  class FinancialPlugin extends FunctionPlugin {
    financial({ args }) {
      if (!args.length) {
        return new InvalidArgumentsError(1);
      }

      const attribute = args[0].value;

      // TODO: Add proper error checking here later
      if (args.length === 1) {
        return ttmData[attribute] || 0;
      }

      const startDate = args[1].value;

      if (args.length === 2) {
        return getPropertyFromOneOfStatements(attribute, startDate);
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
