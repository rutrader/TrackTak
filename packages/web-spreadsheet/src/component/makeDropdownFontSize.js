import { getDropdown } from "./getDropdown";
import { h } from "./element";
import { fontSizes } from "../core/font";
import { cssPrefix } from "../config";
import spreadsheetEvents from "../core/spreadsheetEvents";

export const makeDropdownFontSize = (eventEmitter) => (tag) => {
  const nfontSizes = fontSizes.map((it) =>
    h("div", `${cssPrefix}-item`)
      .on("click", () => {
        dropdown.setTitle(`${it.pt}`);

        eventEmitter.emit(spreadsheetEvents.toolbar.fontChange, tag, it.pt);
      })
      .child(`${it.pt}`),
  );

  const dropdown = getDropdown(
    "10",
    "60px",
    true,
    "bottom-left",
    ...nfontSizes,
  );

  return {
    dropdown,
  };
};
