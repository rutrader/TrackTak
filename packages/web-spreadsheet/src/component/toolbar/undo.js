import IconItem, { getIconItem } from "./icon_item";

export const getUndo = (eventEmitter) => {
  const tag = "undo";
  const shortcut = "Ctrl+Z";
  const iconItem = getIconItem(tag, shortcut, eventEmitter);

  return {
    item: iconItem.item,
    iconItem,
  };
};

export default class Undo extends IconItem {
  constructor(formats) {
    super(formats, "undo", "Ctrl+Z");
  }
}
