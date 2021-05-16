import Dropdown from "./dropdown";
import ColorPalette from "./color_palette";
import getIcon from "./icon";

export default class DropdownColor extends Dropdown {
  constructor(iconName, color) {
    const icon = getIcon(iconName)
      .element.css("height", "16px")
      .css("border-bottom", `3px solid ${color}`);
    const colorPalette = new ColorPalette();
    colorPalette.change = (v) => {
      this.setTitle(v);
      this.change(v);
    };
    super(icon, "auto", false, "bottom-left", colorPalette.el);
  }

  setTitle(color) {
    this.title.css("border-color", color);
    this.hide();
  }
}
