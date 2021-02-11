import { createSelector } from "@reduxjs/toolkit";
import selectInputQueryParams, {
  requiredInputQueries,
} from "./selectInputQueryParams";
import isNil from "lodash/isNil";

const selectHasAllRequiredInputsFilledIn = createSelector(
  selectInputQueryParams,
  (inputQueryParams) => {
    const hasAllRequiredInputsFilledIn = requiredInputQueries.every(
      ({ name }) => !isNil(inputQueryParams[name]),
    );

    return hasAllRequiredInputsFilledIn;
  },
);

export default selectHasAllRequiredInputsFilledIn;
