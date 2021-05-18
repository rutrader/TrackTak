import Dropdown, { getDropdown } from "./dropdown";
import ColorPalette, { getColorPalette } from "./color_palette";
import getIcon, { Icon } from "./icon";
import spreadsheetEvents from "../core/spreadsheetEvents";

export const getDropdownColor = (tag, iconName, color, eventEmitter) => {
  const icon = getIcon(iconName)
    .el.css("height", "16px")
    .css("border-bottom", `3px solid ${color}`);
  const colorPalette = getColorPalette(tag, eventEmitter);

  eventEmitter.on(
    spreadsheetEvents.toolbar.colorPaletteChange,
    (_, bgColor) => {
      setTitle(bgColor);
    },
  );

  const setTitle = (color) => {
    dropdown.title.css("border-color", color);
    dropdown.hide();
  };

  const dropdown = getDropdown(
    icon,
    "auto",
    false,
    "bottom-left",
    colorPalette.el,
  );

  return {
    dropdown,
    colorPalette,
    setTitle,
  };
};

export default class DropdownColor extends Dropdown {
  constructor(iconName, color) {
    const icon = new Icon(iconName)
      .css("height", "16px")
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
