import Dropdown, { getDropdown } from "./dropdown";
import { h } from "./element";
import { cssPrefix } from "../config";

import { HyperFormula } from "hyperformula";
import getIcon from "./icon";
import spreadsheetEvents from "../core/spreadsheetEvents";

export const makeDropdownFormula = (eventEmitter) => (tag) => {
  const nformulas = HyperFormula.getRegisteredFunctionNames("enGB").map((it) =>
    h("div", `${cssPrefix}-item`)
      .on("click", () => {
        dropdown.hide();

        eventEmitter.emit(spreadsheetEvents.toolbar.formulaSet, tag, it);
      })
      .child(it),
  );
  const icon = getIcon("formula");

  const dropdown = getDropdown(
    icon,
    "180px",
    true,
    "bottom-left",
    ...nformulas,
  );

  return {
    dropdown,
  };
};

export default class DropdownFormula extends Dropdown {
  constructor() {
    const nformulas = HyperFormula.getRegisteredFunctionNames("enGB").map(
      (it) =>
        h("div", `${cssPrefix}-item`)
          .on("click", () => {
            this.hide();
            this.change(it);
          })
          .child(it),
    );
    super(getIcon("formula"), "180px", true, "bottom-left", ...nformulas);
  }
}
