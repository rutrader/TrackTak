import { withShortcut } from "./icon_item";
import ToggleItem, { getToggleItem } from "./toggle_item";

export const getItalic = (eventEmitter) => {
  const tag = "font-italic";
  const shortcut = "Ctrl+I";
  const toggleItem = withShortcut(getToggleItem(tag, eventEmitter), shortcut);

  return {
    item: toggleItem.item,
    toggleItem,
  };
};

export default class Italic extends ToggleItem {
  constructor(formats) {
    super(formats, "font-italic", "Ctrl+I");
  }
}
