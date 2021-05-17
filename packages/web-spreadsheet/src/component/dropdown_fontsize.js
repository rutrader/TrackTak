import Dropdown, { getDropdown } from "./dropdown";
import { h } from "./element";
import { fontSizes } from "../core/font";
import { cssPrefix } from "../config";
import spreadsheetEvents from "../core/spreadsheetEvents";

export const getDropdownFontSize = (tag, eventEmitter) => {
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

export default class DropdownFontSize extends Dropdown {
  constructor() {
    const nfontSizes = fontSizes.map((it) =>
      h("div", `${cssPrefix}-item`)
        .on("click", () => {
          this.setTitle(`${it.pt}`);
          this.change(it);
        })
        .child(`${it.pt}`),
    );
    super("10", "60px", true, "bottom-left", ...nfontSizes);
  }
}
