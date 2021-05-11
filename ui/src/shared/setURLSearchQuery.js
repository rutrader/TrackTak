import { allInputNameTypeMappings } from "@tracktak/dcf-react";

const setURLSearchQuery = (inputFields) => {
  const searchParams = new URLSearchParams();

  Object.keys(allInputNameTypeMappings).forEach((name) => {
    if (inputFields[name]) {
      searchParams.set(name, inputFields[name]);
    }
  });

  return searchParams;
};

export default setURLSearchQuery;
