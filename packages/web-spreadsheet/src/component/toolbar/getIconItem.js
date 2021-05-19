import { getItem } from "./item";
import getIcon from "../getIcon";
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

export const withShortcut = ({ item, ...baseItem }, shortcut) => {
  return {
    ...baseItem,
    item: {
      ...item,
      shortcut: shortcut ? (item.tip += ` (${shortcut})`) : undefined,
    },
  };
};
