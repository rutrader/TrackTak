import { withShortcut } from "./icon_item";
import ToggleItem, { getToggleItem } from "./toggle_item";

export const getUnderline = (eventEmitter) => {
  const tag = "underline";
  const shortcut = "Ctrl+U";
  const toggleItem = withShortcut(getToggleItem(tag, eventEmitter), shortcut);

  return {
    item: toggleItem.item,
    toggleItem,
  };
};

export default class Underline extends ToggleItem {
  constructor(formats) {
    super(formats, "underline", "Ctrl+U");
  }
}
