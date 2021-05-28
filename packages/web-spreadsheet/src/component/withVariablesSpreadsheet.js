import { buildVariablesSpreadsheet } from "./builders/buildVariablesSpreadsheet";

export const withVariablesSpreadsheet = ({ sheet, ...args }) => {
  const { rootEl, el: sheetEl, getOptions } = sheet;

  const variablesSpreadsheet = buildVariablesSpreadsheet(
    sheetEl,
    rootEl,
    getOptions,
  );

  return {
    ...args,
    sheet,
    variablesSpreadsheet,
  };
};
