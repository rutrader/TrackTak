import { createSelector } from "@reduxjs/toolkit";
import { isNil } from "lodash-es";
import selectValueOption from "./selectValueOption";

const selectValueOfAllOptionsOutstanding = (inputQueryParams) =>
  createSelector(selectValueOption(inputQueryParams), (valuePerOption) => {
    if (isNil(valuePerOption)) return null;
    if (isNil(inputQueryParams.numberOfEmployeeOptionsOutstanding)) return null;

    // TODO: Use expression and put in excel export sheet
    return valuePerOption * inputQueryParams.numberOfEmployeeOptionsOutstanding;
  });

export default selectValueOfAllOptionsOutstanding;
