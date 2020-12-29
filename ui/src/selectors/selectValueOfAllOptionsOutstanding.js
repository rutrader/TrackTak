import { createSelector } from "@reduxjs/toolkit";
import selectQueryParams from "./selectQueryParams";
import selectValueOption from "./selectValueOption";

const selectValueOfAllOptionsOutstanding = createSelector(
  selectValueOption,
  selectQueryParams,
  (valuePerOption, queryParams) => {
    if (valuePerOption === null) return null;
    if (queryParams.numberOfOptionsOutstanding === undefined) return null;

    return valuePerOption * queryParams.numberOfOptionsOutstanding;
  }
);

export default selectValueOfAllOptionsOutstanding;
