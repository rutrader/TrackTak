import { h } from "./element";
import { bindClickoutside, unbindClickoutside } from "./event";
import { cssPrefix } from "../config";
import { tf } from "../locale/locale";
import spreadsheetEvents from "../core/spreadsheetEvents";
import { setElementPosition } from "../shared/setElementPosition";

export const menuItems = [
  { key: "comment", title: tf("contextmenu.comment"), label: "Ctrl+Alt+M" },
  { key: "copy", title: tf("contextmenu.copy"), label: "Ctrl+C" },
  { key: "cut", title: tf("contextmenu.cut"), label: "Ctrl+X" },
  { key: "paste", title: tf("contextmenu.paste"), label: "Ctrl+V" },
  {
    key: "pasteValue",
    title: tf("contextmenu.pasteValue"),
    label: "Ctrl+Shift+V",
  },
  {
    key: "pasteFormat",
    title: tf("contextmenu.pasteFormat"),
    label: "Ctrl+Alt+V",
  },
  { key: "divider" },
  { key: "insertRow", title: tf("contextmenu.insertRow") },
  { key: "insertColumn", title: tf("contextmenu.insertColumn") },
  { key: "divider" },
  { key: "deleteRow", title: tf("contextmenu.deleteRow") },
  { key: "deleteColumn", title: tf("contextmenu.deleteColumn") },
  { key: "deleteCellText", title: tf("contextmenu.deleteCellText") },
  { key: "hide", title: tf("contextmenu.hide") },
  { key: "divider" },
  { key: "validation", title: tf("contextmenu.validation") },
  { key: "divider" },
  { key: "cellPrintable", title: tf("contextmenu.cellprintable") },
  { key: "cellNonPrintable", title: tf("contextmenu.cellnonprintable") },
  { key: "divider" },
  { key: "cellEditable", title: tf("contextmenu.celleditable") },
  { key: "cellNonEditable", title: tf("contextmenu.cellnoneditable") },
];

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
