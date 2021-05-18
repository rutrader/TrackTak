import { getIconItem, withShortcut } from "./icon_item";

export const makeIconItem = (eventEmitter) => (tag, shortcut) => {
  const iconItem = withShortcut(getIconItem(tag, eventEmitter), shortcut);

  return {
    item: iconItem.item,
    iconItem,
  };
};
