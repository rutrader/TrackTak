import queryString from "query-string";

const selectQueryParams = (state) => {
  const search = state.router.location.search;

  return queryString.parse(search, { parseBooleans: true, parseNumbers: true });
};
export default selectQueryParams;
