import { withShortcut } from "./icon_item";
import { getToggleItem } from "./toggle_item";

export const makeToggleItem = (eventEmitter) => (tag, shortcut) => {
  const toggleItem = withShortcut(getToggleItem(tag, eventEmitter), shortcut);

  return {
    item: toggleItem.item,
    toggleItem,
  };
};
