import Dropdown, { getDropdown } from "./dropdown";
import BorderPalette, { getBorderPalette } from "./border_palette";
import getIcon, { Icon } from "./icon";
import spreadsheetEvents from "../core/spreadsheetEvents";

const makeDropdownBorder = (eventEmitter) => (tag) => {
  const icon = getIcon("border-all");
  const borderPalette = getBorderPalette(tag, eventEmitter);

  const dropdown = getDropdown(
    icon,
    "auto",
    false,
    "bottom-left",
    borderPalette.el,
  );

  eventEmitter.on(spreadsheetEvents.toolbar.borderPaletteChange, () => {
    dropdown.hide();
  });

  return {
    dropdown,
  };
};

export default makeDropdownBorder;

export class DropdownBorder extends Dropdown {
  constructor() {
    const icon = new Icon("border-all");
    const borderPalette = new BorderPalette();
    borderPalette.change = (v) => {
      this.change(v);
      this.hide();
    };
    super(icon, "auto", false, "bottom-left", borderPalette.el);
  }
}
