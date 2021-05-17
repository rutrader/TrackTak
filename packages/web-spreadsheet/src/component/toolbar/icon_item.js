import Item, { getItem } from "./item";
import getIcon from "../icon";
import spreadsheetEvents from "../../core/spreadsheetEvents";

export const getIconItem = (tag, eventEmitter) => {
  const item = getItem(tag, eventEmitter);
  const icon = getIcon(tag);

  const setDisabled = (disabled) => {
    item.el.disabled(disabled);
  };

  item.el.child(icon).on("click", () => {
    eventEmitter.emit(spreadsheetEvents.toolbar.toggleItem, tag);
  });

  return {
    setDisabled,
    item,
  };
};

export const withShortcut = ({ item, ...iconItem }, shortcut) => {
  return {
    ...iconItem,
    item: {
      ...item,
      shortcut: (item.tip += ` (${shortcut})`),
    },
  };
};

export default class IconItem extends Item {
  element() {
    return super
      .element()
      .child(getIcon(this.tag))
      .on("click", () => this.change(this.tag));
  }

  setState(disabled) {
    this.el.disabled(disabled);
  }
}
