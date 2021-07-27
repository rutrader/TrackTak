import costOfCapitalData from "./costOfCapitalData.json";
import dcfValuationData from "./dcfValuationData.json";
import employeeOptionsData from "./employeeOptionsData.json";
import financialStatementsData from "./financialStatementsData.json";
import industryAveragesGlobalData from "./industryAveragesGlobalData.json";
import industryAveragesUSData from "./industryAveragesUSData.json";
import syntheticCreditRatingData from "./syntheticCreditRatingData.json";

import requiredInputsData from "./requiredInputsData.json";
import optionalInputsData from "./optionalInputsData.json";
import apiMillionsData from "./apiMillionsData.json";

export const freeCashFlowToFirmData = [
  dcfValuationData,
  financialStatementsData,
  costOfCapitalData,
  employeeOptionsData,
  syntheticCreditRatingData,
  industryAveragesUSData,
  industryAveragesGlobalData,
];

export const freeCashFlowToFirmVariablesData = [
  requiredInputsData,
  optionalInputsData,
  apiMillionsData,
];

export default freeCashFlowToFirmData;
