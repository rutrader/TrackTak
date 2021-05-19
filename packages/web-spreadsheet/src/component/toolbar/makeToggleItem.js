import spreadsheetEvents from "../../core/spreadsheetEvents";
import getIcon from "../getIcon";
import { withShortcut } from "./getIconItem";
import { getItem } from "./item";

const getToggleItem = (tag, eventEmitter) => {
  const item = getItem(tag);
  const icon = getIcon(tag);

  const active = () => {
    item.el.hasClass("active");
  };

  const toggle = () => {
    return item.el.toggle();
  };

  const setActive = (active) => {
    item.el.active(active);
  };

  item.el.child(icon).on("click", () => {
    eventEmitter.emit(spreadsheetEvents.toolbar.toggleItem, tag, toggle());
  });

  return {
    active,
    setActive,
    toggle,
    item,
    icon,
  };
};

export const makeToggleItem = (eventEmitter) => (tag, shortcut) => {
  const toggleItem = withShortcut(getToggleItem(tag, eventEmitter), shortcut);

  return {
    item: toggleItem.item,
    toggleItem,
  };
};
