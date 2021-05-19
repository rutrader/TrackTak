import { h } from "./element";
import { bindClickoutside, unbindClickoutside } from "./event";
import { cssPrefix } from "../config";
import { tf } from "../locale/locale";
import spreadsheetEvents from "../core/spreadsheetEvents";

const menuItems = [
  { key: "copy", title: tf("contextmenu.copy"), label: "Ctrl+C" },
  { key: "cut", title: tf("contextmenu.cut"), label: "Ctrl+X" },
  { key: "paste", title: tf("contextmenu.paste"), label: "Ctrl+V" },
  {
    key: "paste-value",
    title: tf("contextmenu.pasteValue"),
    label: "Ctrl+Shift+V",
  },
  {
    key: "paste-format",
    title: tf("contextmenu.pasteFormat"),
    label: "Ctrl+Alt+V",
  },
  { key: "divider" },
  { key: "insert-row", title: tf("contextmenu.insertRow") },
  { key: "insert-column", title: tf("contextmenu.insertColumn") },
  { key: "divider" },
  { key: "delete-row", title: tf("contextmenu.deleteRow") },
  { key: "delete-column", title: tf("contextmenu.deleteColumn") },
  { key: "delete-cell-text", title: tf("contextmenu.deleteCellText") },
  { key: "hide", title: tf("contextmenu.hide") },
  { key: "divider" },
  { key: "validation", title: tf("contextmenu.validation") },
  { key: "divider" },
  { key: "cell-printable", title: tf("contextmenu.cellprintable") },
  { key: "cell-non-printable", title: tf("contextmenu.cellnonprintable") },
  { key: "divider" },
  { key: "cell-editable", title: tf("contextmenu.celleditable") },
  { key: "cell-non-editable", title: tf("contextmenu.cellnoneditable") },
];

export const getContextMenu = (viewFn, eventEmitter, isHide = false) => {
  function buildMenuItem(item) {
    if (item.key === "divider") {
      return h("div", `${cssPrefix}-item divider`);
    }
    return h("div", `${cssPrefix}-item`)
      .on("click", () => {
        eventEmitter.emit(
          spreadsheetEvents.rightClickMenu.clickContextMenu,
          item.key,
        );
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
    if (isHide) {
      return;
    }
    const { width } = el.show().offset();
    const view = viewFn();
    const vhf = view.height / 2;
    let left = x;
    if (view.width - x <= width) {
      left -= width;
    }
    el.css("left", `${left}px`);
    if (y > vhf) {
      el.css("bottom", `${view.height - y}px`)
        .css("max-height", `${y}px`)
        .css("top", "auto");
    } else {
      el.css("top", `${y}px`)
        .css("max-height", `${view.height - y}px`)
        .css("bottom", "auto");
    }
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
    isHide,
  };
};
