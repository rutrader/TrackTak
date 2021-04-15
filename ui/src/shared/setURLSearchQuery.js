import { inputQueries } from "@tracktak/dcf-react";

const setURLSearchQuery = (inputFields) => {
  const searchParams = new URLSearchParams();

  inputQueries.forEach(({ name }) => {
    if (inputFields[name]) {
      searchParams.set(name, inputFields[name]);
    }
  });

  return searchParams;
};

export default setURLSearchQuery;
