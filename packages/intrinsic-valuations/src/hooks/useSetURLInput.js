import useQueryParams from "./useQueryParams";
import convertParamsObjectToURLSearchParams from "../shared/convertParamsObjectToURLSearchParams";
import { navigate } from "../shared/gatsby";
import { useLocation } from "@reach/router";
import { isNil } from "lodash-es";
import { useCallback } from "react";

const useSetURLInput = () => {
  const queryParams = useQueryParams();
  const location = useLocation();

  const setURLInput = useCallback(
    (key, value = null) => {
      let newValue = value;

      if (value === "") {
        newValue = null;
      }

      const urlSearchParams = convertParamsObjectToURLSearchParams(queryParams);

      const existingValue = urlSearchParams.get(key);
      const parsedExistingValue = isNil(existingValue)
        ? null
        : parseFloat(existingValue);

      if (parsedExistingValue === newValue) return;

      if (newValue || newValue === 0) {
        urlSearchParams.set(key, newValue);
      } else {
        urlSearchParams.delete(key);
      }

      const path = `${location.pathname}?${urlSearchParams.toString()}`;

      navigate(path);
    },
    [location.pathname, queryParams],
  );

  return setURLInput;
};

export default useSetURLInput;
