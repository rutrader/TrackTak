import { getIconItem, withShortcut } from "./getIconItem";

export const makeIconItem = (eventEmitter) => (tag, shortcut) => {
  const iconItem = withShortcut(getIconItem(tag, eventEmitter), shortcut);

  return {
    item: iconItem.item,
    iconItem,
  };
};
