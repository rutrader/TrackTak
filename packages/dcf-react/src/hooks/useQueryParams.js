import queryString from "query-string";
import { useLocation } from "@reach/router";
import { useMemo } from "react";

const useQueryParams = () => {
  const search = useLocation().search;
  const parsedSearch = useMemo(
    () => queryString.parse(search, { parseBooleans: true }),
    [search],
  );

  return parsedSearch;
};

export default useQueryParams;
