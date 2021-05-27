import { buildVariablesSpreadsheet } from "./builders/buildVariablesSpreadsheet";

export const withVariablesSpreadsheet = ({ sheet, ...args }) => {
  const {
    eventEmitter,
    rootEl,
    el: sheetEl,
    hyperformula,
    getOptions,
    getData,
  } = sheet;

  const variablesSpreadsheet = buildVariablesSpreadsheet(
    sheetEl,
    rootEl,
    getOptions,
    getData,
    hyperformula,
    eventEmitter,
  );

  return {
    ...args,
    sheet,
    variablesSpreadsheet,
  };
};
