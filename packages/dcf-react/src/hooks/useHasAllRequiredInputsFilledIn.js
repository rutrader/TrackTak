import useInputQueryParams, {
  requiredInputQueries,
} from "./useInputQueryParams";
import isNil from "lodash/isNil";

const useHasAllRequiredInputsFilledIn = () => {
  const inputQueryParams = useInputQueryParams();

  const hasAllRequiredInputsFilledIn = requiredInputQueries.every(
    ({ name }) => !isNil(inputQueryParams[name]),
  );

  return hasAllRequiredInputsFilledIn;
};

export default useHasAllRequiredInputsFilledIn;
