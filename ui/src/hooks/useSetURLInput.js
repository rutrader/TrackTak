import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import selectQueryParams from "../selectors/routerSelectors/selectQueryParams";
import convertParamsObjectToURLSearchParams from "../shared/convertParamsObjectToURLSearchParams";

const useSetURLInput = () => {
  const history = useHistory();
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

    history.push({
      search: urlSearchParams.toString(),
    });
  };
};

export default useSetURLInput;
