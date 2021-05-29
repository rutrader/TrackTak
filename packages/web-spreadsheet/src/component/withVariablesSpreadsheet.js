import { buildVariablesSpreadsheet } from "./builders/buildVariablesSpreadsheet";

export const withVariablesSpreadsheet = (
  { sheet, ...args },
  variablesSpreadsheetOptions,
) => {
  const { rootEl, el: sheetEl } = sheet;

  const variablesSpreadsheet = buildVariablesSpreadsheet(
    sheetEl,
    rootEl,
    variablesSpreadsheetOptions,
  );

  return {
    ...args,
    sheet,
    variablesSpreadsheet,
  };
};
