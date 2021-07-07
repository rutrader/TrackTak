import { getRowNumberFromCellKey } from "./utils";

const sortAlphaNumeric = (a, b) => {
  const diff = getRowNumberFromCellKey(a) - getRowNumberFromCellKey(b);

  return diff || a.localeCompare(b);
};

export default sortAlphaNumeric;
