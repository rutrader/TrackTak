import { getDropdown } from "./getDropdown";
import { h } from "./element";
import { cssPrefix } from "../config";

import { HyperFormula } from "hyperformula";
import getIcon from "./getIcon";
import spreadsheetEvents from "../core/spreadsheetEvents";

export const makeDropdownFunction = (eventEmitter) => (tag) => {
  const functions = HyperFormula.getRegisteredFunctionNames("enGB").map((it) =>
    h("div", `${cssPrefix}-item`)
      .on("click", () => {
        dropdown.hide();

        eventEmitter.emit(spreadsheetEvents.toolbar.functionSet, tag, it);
      })
      .child(it),
  );
  const icon = getIcon("function");

  const dropdown = getDropdown(
    icon,
    "180px",
    true,
    "bottom-left",
    ...functions,
  );

  return {
    dropdown,
  };
};
