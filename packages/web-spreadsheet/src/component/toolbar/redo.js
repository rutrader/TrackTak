import IconItem, { getIconItem } from "./icon_item";

export const getRedo = (eventEmitter) => {
  const tag = "redo";
  const shortcut = "Ctrl+Y";
  const iconItem = getIconItem(tag, shortcut, eventEmitter);

  return {
    item: iconItem.item,
    iconItem,
  };
};

export default class Redo extends IconItem {
  constructor(formats) {
    super(formats, "redo", "Ctrl+Y");
  }
}
