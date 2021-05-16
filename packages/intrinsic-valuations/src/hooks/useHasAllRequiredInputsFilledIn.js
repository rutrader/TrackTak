import useInputQueryParams from "./useInputQueryParams";
import { requiredInputNameTypeMapping } from "../discountedCashFlow/scopeNameTypeMapping";
import { isNil } from "lodash-es";

const useHasAllRequiredInputsFilledIn = () => {
  const inputQueryParams = useInputQueryParams();

  const hasAllRequiredInputsFilledIn = Object.keys(
    requiredInputNameTypeMapping,
  ).every((name) => !isNil(inputQueryParams[name]));

  return hasAllRequiredInputsFilledIn;
};

export default useHasAllRequiredInputsFilledIn;
