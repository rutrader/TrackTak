const convertParamsObjectToURLSearchParams = (queryParams) => {
  const urlSearchParams = new URLSearchParams();

  Object.keys(queryParams).forEach((param) => {
    urlSearchParams.set(param, queryParams[param]);
  });

  return urlSearchParams;
};

export default convertParamsObjectToURLSearchParams;
