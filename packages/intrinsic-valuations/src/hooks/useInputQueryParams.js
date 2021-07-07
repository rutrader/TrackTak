import { useMemo } from "react";
import { allInputNameTypeMappings } from "../spreadsheet/scopeNameTypeMapping";
import useQueryParams from "./useQueryParams";

const getInputQueryParams = (query) => {
  const inputQueryParams = {};

  Object.keys(allInputNameTypeMappings).forEach((name) => {
    //Temp
    if (query[name]?.includes("%")) {
      inputQueryParams[name] = query[name];
    } else {
      // Set it to null and not undefined so that they still get sent through the axios requests
      inputQueryParams[name] = query[name] ? parseFloat(query[name]) : null;
    }
  });

  return inputQueryParams;
};

const useInputQueryParams = () => {
  const queryParams = useQueryParams();
  const inputQueryParams = useMemo(() => getInputQueryParams(queryParams), [
    queryParams,
  ]);

  return inputQueryParams;
};

export default useInputQueryParams;
