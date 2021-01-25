import { utils } from "xlsx";

const setColumnWidths = (worksheet) => {
  const newWorksheet = { ...worksheet };
  const objectMaxLength = [];
  const columns = utils.decode_range(worksheet["!ref"]);

  for (let index = columns.s.c; index <= columns.e.c; index++) {
    objectMaxLength.push({ width: index === 0 ? 40 : 15 });
  }

  newWorksheet["!cols"] = objectMaxLength;

  return newWorksheet;
};

export default setColumnWidths;
