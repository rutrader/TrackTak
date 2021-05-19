import { getDropdown } from "./getDropdown";
import { getBorderPalette } from "./getBorderPalette";
import getIcon from "./getIcon";
import spreadsheetEvents from "../core/spreadsheetEvents";

export const makeDropdownBorder = (eventEmitter) => (tag) => {
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
