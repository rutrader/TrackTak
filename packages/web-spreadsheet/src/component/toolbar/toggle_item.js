import Item, { getItem } from "./item";
import getIcon from "../icon";
import spreadsheetEvents from "../../core/spreadsheetEvents";

export const getToggleItem = (tag, eventEmitter) => {
  const item = getItem(tag);
  const icon = getIcon(tag);

  const active = () => {
    item.el.hasClass("active");
  };

  const setActive = (active) => {
    item.el.active(active);
  };

  item.el.child(icon).on("click", () => {
    eventEmitter.emit(
      spreadsheetEvents.toolbar.toggleItem,
      tag,
      item.el.toggle(),
    );
  });

  return {
    active,
    setActive,
    item,
    icon,
  };
};

export default class ToggleItem extends Item {
  element() {
    const { tag } = this;
    return super
      .element()
      .child(getIcon(tag))
      .on("click", () => this.click());
  }

  click() {
    this.change(this.tag, this.toggle());
  }

  setState(active) {
    this.el.active(active);
  }

  toggle() {
    return this.el.toggle();
  }

  active() {
    return this.el.hasClass("active");
  }
}
