import { withShortcut } from "./icon_item";
import ToggleItem, { getToggleItem } from "./toggle_item";

export const getStrike = (eventEmitter) => {
  const tag = "strike";
  const shortcut = "Ctrl+S";
  const toggleItem = withShortcut(getToggleItem(tag, eventEmitter), shortcut);

  return {
    item: toggleItem.item,
    toggleItem,
  };
};

export default class Strike extends ToggleItem {
  constructor(formats) {
    super(formats, "strike", "Ctrl+S");
  }
}
