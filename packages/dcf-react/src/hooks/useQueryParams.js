import queryString from "query-string";
import { useLocation } from "@reach/router";

const useQueryParams = () => {
  const search = useLocation().search;

  return queryString.parse(search, { parseBooleans: true });
};

export default useQueryParams;
