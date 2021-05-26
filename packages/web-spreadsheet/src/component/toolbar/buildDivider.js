import { cssPrefix } from "../../config";
import { h } from "../element";

export const buildDivider = () => {
  return h("div", `${cssPrefix}-toolbar-divider`);
};
