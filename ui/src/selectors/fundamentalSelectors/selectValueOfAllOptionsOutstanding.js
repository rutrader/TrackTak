import { createSelector } from "@reduxjs/toolkit";
import selectInputQueryParams from "../routerSelectors/selectInputQueryParams";
import selectValueOption from "./selectValueOption";

const selectValueOfAllOptionsOutstanding = createSelector(
  selectValueOption,
  selectInputQueryParams,
  (valuePerOption, queryParams) => {
    if (valuePerOption === null) return null;
    if (queryParams.numberOfEmployeeOptionsOutstanding === undefined)
      return null;

    // TODO: Use expression and put in excel export sheet
    return valuePerOption * queryParams.numberOfEmployeeOptionsOutstanding;
  }
);

export default selectValueOfAllOptionsOutstanding;
