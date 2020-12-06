const setInputQueryParams = (urlSearchParams, key, value) => {
  if (value) {
    urlSearchParams.set(key, value);
  } else {
    urlSearchParams.delete(key);
  }
};

export default setInputQueryParams;
