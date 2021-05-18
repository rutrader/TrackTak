import ToggleItem, { getToggleItem } from "./toggle_item";

export const getFreeze = (eventEmitter) => {
  const tag = "freeze";
  const toggleItem = getToggleItem(tag, eventEmitter);

  return {
    item: toggleItem.item,
    toggleItem,
  };
};

export default class Freeze extends ToggleItem {
  constructor(formats) {
    super(formats, "freeze");
  }
}
