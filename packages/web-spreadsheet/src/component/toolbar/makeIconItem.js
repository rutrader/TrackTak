import { getIconItem, withShortcut } from "./getIconItem";

export const makeIconItem = (eventEmitter, toolbarType) => (tag, shortcut) => {
  const iconItem = withShortcut(
    getIconItem(tag, eventEmitter, toolbarType),
    shortcut,
  );

  return {
    item: iconItem.item,
    iconItem,
  };
};
