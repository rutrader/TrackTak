import ToggleItem, { getToggleItem } from "./toggle_item";

export const getPaintFormat = (eventEmitter) => {
  const tag = "paintformat";
  const toggleItem = getToggleItem(tag, eventEmitter);

  return {
    item: toggleItem.item,
    toggleItem,
  };
};

export default class Paintformat extends ToggleItem {
  constructor(formats) {
    super(formats, "paintformat");
  }

  setState() {}
}
