import { getDropdown } from "./getDropdown";
import { h } from "./element";
import { cssPrefix } from "../config";
import spreadsheetEvents from "../core/spreadsheetEvents";

export const makeDropdownVariablesSheet = (eventEmitter, variables) => (
  tag,
) => {
  const nvariables = variables.map((it) =>
    h("div", `${cssPrefix}-item`)
      .on("click", () => {
        dropdown.setTitle(it.title);

        eventEmitter.emit(
          spreadsheetEvents.toolbar.variablesSheetChange,
          tag,
          it.title,
        );
      })
      .child(it.title),
  );

  const dropdown = getDropdown(
    variables[0].title,
    "160px",
    true,
    "bottom-left",
    ...nvariables,
  );

  return {
    dropdown,
  };
};
