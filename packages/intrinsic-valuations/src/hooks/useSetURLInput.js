import useQueryParams from "./useQueryParams";
import convertParamsObjectToURLSearchParams from "../shared/convertParamsObjectToURLSearchParams";
import { navigate } from "../shared/gatsby";
import { useLocation } from "@reach/router";
import { isNil } from "lodash-es";

const useSetURLInput = () => {
  const queryParams = useQueryParams();
  const location = useLocation();

  return (key, value = null) => {
    const urlSearchParams = convertParamsObjectToURLSearchParams(queryParams);

    const existingValue = urlSearchParams.get(key);
    const parsedExistingValue = isNil(existingValue)
      ? null
      : parseFloat(existingValue);

    if (parsedExistingValue === value) return;

    if (value || value === 0) {
      urlSearchParams.set(key, value);
    } else {
      urlSearchParams.delete(key);
    }

    const path = `${location.pathname}?${urlSearchParams.toString()}`;

    navigate(path);
  };
};

export default useSetURLInput;
