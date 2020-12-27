import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectQueryParams } from "../selectors/getInputQueryParams";
import getInputQueryURLSearchParams from "../shared/getInputQueryURLSearchParams";

const useSetURLInput = () => {
  const history = useHistory();
  const queryParams = useSelector(selectQueryParams);

  return (key, value = null) => {
    const urlSearchParams = getInputQueryURLSearchParams(queryParams);

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
