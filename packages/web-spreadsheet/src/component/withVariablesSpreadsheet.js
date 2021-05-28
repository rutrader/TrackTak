import { buildVariablesSpreadsheet } from "./builders/buildVariablesSpreadsheet";

export const withVariablesSpreadsheet = ({ sheet, ...args }) => {
  const { rootEl, el: sheetEl, hyperformula, getOptions } = sheet;

  const variablesSpreadsheet = buildVariablesSpreadsheet(
    sheetEl,
    rootEl,
    getOptions,
    hyperformula,
  );

  return {
    ...args,
    sheet,
    variablesSpreadsheet,
  };
};
