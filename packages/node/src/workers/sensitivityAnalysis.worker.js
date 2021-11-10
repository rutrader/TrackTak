// import { HyperFormula } from "hyperformula";
// import { parentPort } from "worker_threads";
// import nodeEndpoint from "comlink/dist/umd/node-adapter";
// import { expose } from "comlink";
// import calculateDCFModel from "../dcfModel/calculateDCFModel";
//  import hyperformulaConfig from "../../../packages/financial-model/src/spreadsheet/hyperformulaConfig";

// const sensitivityAnalysisWorker = {
//   computeSensitivityAnalysis: (
//     sheetsSerializedValues,
//     existingScope,
//     currentScopes,
//   ) => {
//     const hyperformula = HyperFormula.buildFromSheets(
//       sheetsSerializedValues,
//          hyperformulaConfig,
//     );

//     const values = currentScopes.map((currentScope) => {
//       const model = calculateDCFModel(hyperformula, {
//         ...existingScope,
//         ...currentScope,
//       });

//       const estimatedPricePerShare = model[53][1];

//       return estimatedPricePerShare;
//     });

//     return values;
//   },
// };

// expose(sensitivityAnalysisWorker, nodeEndpoint(parentPort));
