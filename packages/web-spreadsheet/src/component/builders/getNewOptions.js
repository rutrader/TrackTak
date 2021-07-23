import { merge } from "lodash-es";

export const getNewOptions = (
  options,
  existingOptions,
  defaultOptions,
  data,
  sheet,
) => {
  const newOptions = merge(defaultOptions, existingOptions, options);

  if (data) {
    sheet.sheetReset();
  }

  return newOptions;
};
