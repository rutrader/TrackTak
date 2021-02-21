import { createSelector } from "@reduxjs/toolkit";
import selectValueOption from "./selectValueOption";

const selectValueOfAllOptionsOutstanding = (inputQueryParams) =>
  createSelector(selectValueOption(inputQueryParams), (valuePerOption) => {
    if (valuePerOption === null) return null;
    if (inputQueryParams.numberOfEmployeeOptionsOutstanding === undefined)
      return null;

    // TODO: Use expression and put in excel export sheet
    return valuePerOption * inputQueryParams.numberOfEmployeeOptionsOutstanding;
  });

export default selectValueOfAllOptionsOutstanding;
