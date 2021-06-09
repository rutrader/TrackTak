import { HyperFormula } from "hyperformula";
import { currencySymbolMap } from "currency-symbol-map";
import { parentPort } from "worker_threads";
import nodeEndpoint from "comlink/dist/umd/node-adapter";
import { expose } from "comlink";
import calculateDCFModel from "../dcfModel/calculateDCFModel";

const getHyperformulaInstance = (sheetsSerializedValues) => {
  const hyperformula = HyperFormula.buildFromSheets(sheetsSerializedValues, {
    licenseKey: "05054-b528f-a10c4-53f2a-04b57",
    currencySymbol: Object.values(currencySymbolMap),
  });
  hyperformula.addNamedExpression("TRUE", "=TRUE()");
  hyperformula.addNamedExpression("FALSE", "=FALSE()");

  return hyperformula;
};

const sensitivityAnalysisWorker = {
  computeSensitivityAnalysis: (
    sheetsSerializedValues,
    existingScope,
    currentScopes,
  ) => {
    const hyperformula = getHyperformulaInstance(sheetsSerializedValues);
    const values = currentScopes.map((currentScope) => {
      const model = calculateDCFModel(hyperformula, {
        ...existingScope,
        ...currentScope,
      });
      const estimatedPricePerShare = model[35][1];

      return estimatedPricePerShare;
    });

    return values;
  },
};

expose(sensitivityAnalysisWorker, nodeEndpoint(parentPort));
