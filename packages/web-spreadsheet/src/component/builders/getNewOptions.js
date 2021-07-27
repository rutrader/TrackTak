import { merge } from "lodash-es";

export const getNewOptions = (options, existingOptions, defaultOptions) => {
  const newOptions = merge(defaultOptions, existingOptions, options);

  return newOptions;
};
