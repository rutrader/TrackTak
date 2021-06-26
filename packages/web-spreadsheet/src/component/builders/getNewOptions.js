import { merge } from "lodash-es";

export const getNewOptions = (options, defaultOptions, data, sheet) => {
  const newOptions = merge(defaultOptions, options);

  if (data) {
    sheet.render();
  }

  return newOptions;
};
