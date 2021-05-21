import { getDropdown } from "./getDropdown";
import { h } from "./element";
import { baseFonts } from "../core/font";
import { cssPrefix } from "../config";
import spreadsheetEvents from "../core/spreadsheetEvents";

export const makeDropdownFont = (eventEmitter) => (tag) => {
  const nfonts = baseFonts.map((it) =>
    h("div", `${cssPrefix}-item`)
      .on("click", () => {
        dropdown.setTitle(it.title);

        eventEmitter.emit(spreadsheetEvents.toolbar.fontChange, tag, it.key);
      })
      .child(it.title),
  );

  const dropdown = getDropdown(
    baseFonts[0].title,
    "160px",
    true,
    "bottom-left",
    ...nfonts,
  );

  return {
    dropdown,
  };
};
