import { getDropdown } from "./getDropdown";
import { h } from "./element";
import { cssPrefix } from "../config";

import { HyperFormula } from "hyperformula";
import getIcon from "./getIcon";
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
