import { getItem } from "./item";
import getIcon from "../getIcon";
import spreadsheetEvents from "../../core/spreadsheetEvents";

export const getIconItem = (tag, eventEmitter, toolbarType) => {
  const item = getItem(tag);
  const icon = getIcon(tag);

  const setDisabled = (disabled) => {
    item.el.disabled(disabled);
  };

  item.el.child(icon).on("click", () => {
    eventEmitter.emit(spreadsheetEvents[toolbarType].toggleItem, tag);
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
