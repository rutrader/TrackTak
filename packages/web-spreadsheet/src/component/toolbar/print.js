import IconItem, { getIconItem, withShortcut } from "./icon_item";

export const getPrint = (eventEmitter) => {
  const tag = "print";
  const shortcut = "Ctrl+P";
  const iconItem = withShortcut(getIconItem(tag, eventEmitter), shortcut);

  return {
    item: iconItem.item,
    iconItem,
  };
};

export default class Print extends IconItem {
  constructor(formats) {
    super(formats, "print", "Ctrl+P");
  }
}
