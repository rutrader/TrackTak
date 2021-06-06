import { createSelector } from "@reduxjs/toolkit";
import { isNil } from "lodash-es";
import { queryNames } from "../../discountedCashFlow/templates/freeCashFlowFirmSimple/inputQueryNames";
import selectValueOption from "./selectValueOption";

const selectValueOfAllOptionsOutstanding = (inputQueryParams) =>
  createSelector(selectValueOption(inputQueryParams), (valuePerOption) => {
    if (isNil(valuePerOption)) return null;
    if (isNil(inputQueryParams[queryNames.employeeOptionsOutstanding]))
      return null;

    // TODO: Use expression and put in excel export sheet
    return (
      valuePerOption * inputQueryParams[queryNames.employeeOptionsOutstanding]
    );
  });

export default selectValueOfAllOptionsOutstanding;
