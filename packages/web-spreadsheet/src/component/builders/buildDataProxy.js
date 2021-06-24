import Scroll from "../../core/scroll";
import AutoFilter from "../../core/auto_filter";
import { Merges } from "../../core/merge";
import { Rows } from "../../core/row";
import { Cols } from "../../core/col";
import { Validations } from "../../core/validation";

export const buildDataProxy = (getOptions, getData, hyperformula) => () => {
  // save object
  const merges = new Merges(); // [CellRange, ...]
  const rows = new Rows(() => getOptions().row, getData, hyperformula);
  const cols = new Cols(() => getOptions().col);
  const validations = new Validations();

  // don't save object
  const scroll = new Scroll();
  const autoFilter = new AutoFilter();

  return {
    merges,
    rows,
    cols,
    validations,
    scroll,
    autoFilter,
  };
};
