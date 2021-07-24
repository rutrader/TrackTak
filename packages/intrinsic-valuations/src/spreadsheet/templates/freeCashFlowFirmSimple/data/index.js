import costOfCapitalData from "./costOfCapitalData.json";
import dcfValuationData from "./dcfValuationData.json";
import employeeOptionsData from "./employeeOptionsData.json";
import financialStatementsData from "./financialStatementsData.json";
import industryAveragesGlobalData from "./industryAveragesGlobalData.json";
import industryAveragesUSData from "./industryAveragesUSData.json";
import optionalInputsData from "./optionalInputsData.json";
import requiredInputsData from "./requiredInputsData.json";
import syntheticCreditRatingData from "./syntheticCreditRatingData.json";

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
];

export default freeCashFlowToFirmData;
