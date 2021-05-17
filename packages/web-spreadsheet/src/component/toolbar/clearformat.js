import IconItem, { getIconItem } from "./icon_item";

export const getClearFormat = (eventEmitter) => {
  const tag = "clearformat";
  const iconItem = getIconItem(tag, eventEmitter);

  return {
    item: iconItem.item,
    iconItem,
  };
};

export default class Clearformat extends IconItem {
  constructor(formats) {
    super(formats, "clearformat");
  }
}
