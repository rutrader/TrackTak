import { useSelector } from "react-redux";
import selectQueryParams from "../selectors/routerSelectors/selectQueryParams";
import convertParamsObjectToURLSearchParams from "../shared/convertParamsObjectToURLSearchParams";
import { navigate } from "@reach/router";

const useSetURLInput = () => {
  const queryParams = useSelector(selectQueryParams);

  return (key, value = null) => {
    const urlSearchParams = convertParamsObjectToURLSearchParams(queryParams);

    const existingValue = urlSearchParams.get(key);
    const parsedExistingValue =
      existingValue !== null ? parseFloat(existingValue) : null;

    if (parsedExistingValue === value) return;

    if (value || value === 0) {
      urlSearchParams.set(key, value);
    } else {
      urlSearchParams.delete(key);
    }

    navigate(urlSearchParams.toString());
  };
};

export default useSetURLInput;
