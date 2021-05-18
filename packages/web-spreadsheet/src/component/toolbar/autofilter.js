import ToggleItem, { getToggleItem } from "./toggle_item";

export const getAutofilter = (eventEmitter) => {
  const tag = "autofilter";
  const toggleItem = getToggleItem(tag, eventEmitter);

  return {
    item: toggleItem.item,
    toggleItem,
  };
};

export default class Autofilter extends ToggleItem {
  constructor(formats) {
    super(formats, "autofilter");
  }

  setState() {}
}
