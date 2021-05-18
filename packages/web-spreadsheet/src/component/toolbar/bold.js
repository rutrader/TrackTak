import { withShortcut } from "./icon_item";
import ToggleItem, { getToggleItem } from "./toggle_item";

export const getBold = (eventEmitter) => {
  const tag = "font-bold";
  const shortcut = "Ctrl+B";
  const toggleItem = withShortcut(getToggleItem(tag, eventEmitter), shortcut);

  return {
    item: toggleItem.item,
    toggleItem,
  };
};

export default class Bold extends ToggleItem {
  constructor(formats) {
    super(formats, "font-bold", "Ctrl+B");
  }
}
