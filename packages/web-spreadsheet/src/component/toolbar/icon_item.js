import Item, { getItem, withShortcut } from "./item";
import getIcon from "../icon";
import spreadsheetEvents from "../../core/spreadsheetEvents";

export const getIconItem = (tag, shortcut, eventEmitter) => {
  const item = withShortcut(getItem(tag, eventEmitter), shortcut);
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
