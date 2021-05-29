import { buildVariablesSpreadsheet } from "./builders/buildVariablesSpreadsheet";

export const withVariablesSpreadsheet = (
  { sheet, ...args },
  variablesSpreadsheetOptions,
) => {
  const { rootEl, el: sheetEl, hyperformula } = sheet;

  const variablesSpreadsheet = buildVariablesSpreadsheet(
    sheetEl,
    rootEl,
    variablesSpreadsheetOptions,
    hyperformula,
  );

  return {
    ...args,
    sheet,
    variablesSpreadsheet,
  };
};
