import { buildVariablesSpreadsheet } from "./builders/buildVariablesSpreadsheet";

export const withVariablesSpreadsheet = ({ sheet, ...args }) => {
  const { eventEmitter, rootEl, el: sheetEl, hyperformula, getOptions } = sheet;

  const variablesSpreadsheet = buildVariablesSpreadsheet(
    sheetEl,
    rootEl,
    getOptions,
    hyperformula,
    eventEmitter,
  );

  return {
    ...args,
    sheet,
    variablesSpreadsheet,
  };
};
