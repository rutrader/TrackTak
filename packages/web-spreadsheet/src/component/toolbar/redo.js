import IconItem, { getIconItem, withShortcut } from "./icon_item";

export const getRedo = (eventEmitter) => {
  const tag = "redo";
  const shortcut = "Ctrl+Y";
  const iconItem = withShortcut(getIconItem(tag, eventEmitter), shortcut);

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
