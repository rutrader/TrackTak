import Dropdown from "./dropdown";
import BorderPalette from "./border_palette";
import getIcon from "./icon";

export default class DropdownBorder extends Dropdown {
  constructor() {
    const icon = getIcon("border-all");
    const borderPalette = new BorderPalette();
    borderPalette.change = (v) => {
      this.change(v);
      this.hide();
    };
    super(icon, "auto", false, "bottom-left", borderPalette.el);
  }
}
