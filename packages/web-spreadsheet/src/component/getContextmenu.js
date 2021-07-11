import { h } from "./element";
import { bindClickoutside, unbindClickoutside } from "./event";
import { cssPrefix } from "../config";
import spreadsheetEvents from "../core/spreadsheetEvents";
import { setElementPosition } from "../shared/setElementPosition";
import menuItems from "./menuItems";

export const getContextMenu = (viewFn, eventEmitter, hideFn) => {
  function buildMenuItem(item) {
    if (item.key === "divider") {
      return h("div", `${cssPrefix}-item divider`);
    }
    return h("div", `${cssPrefix}-item`)
      .on("click", () => {
        eventEmitter.emit(spreadsheetEvents.rightClickMenu[item.key]);
        hide();
      })
      .children(item.title(), h("div", "label").child(item.label || ""));
  }

  const mappedMenuItems = menuItems.map(buildMenuItem);
  const el = h("div", `${cssPrefix}-contextmenu`)
    .children(...mappedMenuItems)
    .hide();

  // row-col: the whole rows or the whole cols
  // range: select range
  const setMode = (mode) => {
    const hideEl = mappedMenuItems[12];
    if (mode === "row-col") {
      hideEl.show();
    } else {
      hideEl.hide();
    }
  };

  const hide = () => {
    el.hide();
    unbindClickoutside(el);
  };

  const setPosition = (x, y) => {
    if (hideFn()) {
      return;
    }
    setElementPosition(el, viewFn, x, y, { top: y });
    bindClickoutside(el);
  };

  setMode("range");

  return {
    setMode,
    hide,
    setPosition,
    el,
    menuItems: mappedMenuItems,
    viewFn,
  };
};
