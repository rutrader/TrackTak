import ToggleItem, { getToggleItem } from "./toggle_item";

export const getTextWrap = (eventEmitter) => {
  const tag = "textwrap";
  const toggleItem = getToggleItem(tag, eventEmitter);

  return {
    item: toggleItem.item,
    toggleItem,
  };
};

export default class Textwrap extends ToggleItem {
  constructor(formats) {
    super(formats, "textwrap");
  }
}
