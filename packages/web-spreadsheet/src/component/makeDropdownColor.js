import { getDropdown } from "./getDropdown";
import { getColorPalette } from "./getColorPalette";
import getIcon from "./getIcon";
import spreadsheetEvents from "../core/spreadsheetEvents";

export const makeDropdownColor = (iconName, color, eventEmitter) => (tag) => {
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
