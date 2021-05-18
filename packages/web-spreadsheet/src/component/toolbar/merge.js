import ToggleItem, { getToggleItem } from "./toggle_item";

export const getMerge = (eventEmitter) => {
  const tag = "merge";
  const toggleItem = getToggleItem(tag, eventEmitter);
  const item = toggleItem.item;

  const setDisabled = (disabled) => {
    item.el.disabled(disabled);
  };

  return {
    item,
    toggleItem,
    setDisabled,
  };
};

export default class Merge extends ToggleItem {
  constructor(formats) {
    super(formats, "merge");
  }

  setState(active, disabled) {
    this.el.active(active).disabled(disabled);
  }
}
