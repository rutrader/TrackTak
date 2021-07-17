import getCostOfCapitalData from "./getCostOfCapitalData";
import getDCFValuationData from "./getDCFValuationData";
import getEmployeeOptionsData from "./getEmployeeOptionsData";
import getFinancialStatementsData from "./getFinancialStatementsData";
import getIndustryAveragesGlobalData from "./getIndustryAveragesGlobalData";
import getIndustryAveragesUSData from "./getIndustryAveragesUSData";
import getOptionalInputsData from "./getOptionalInputsData";
import getRequiredInputsData from "./getRequiredInputsData";
import getSyntheticCreditRatingData from "./getSyntheticCreditRatingData";

export const freeCashFlowToFirmData = [
  getDCFValuationData(),
  getFinancialStatementsData(),
  getCostOfCapitalData(),
  getEmployeeOptionsData(),
  getSyntheticCreditRatingData(),
  getIndustryAveragesUSData(),
  getIndustryAveragesGlobalData(),
];

export const freeCashFlowToFirmVariablesData = [
  getRequiredInputsData(),
  getOptionalInputsData(),
];

export default freeCashFlowToFirmData;
