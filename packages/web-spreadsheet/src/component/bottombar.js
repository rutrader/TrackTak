import { h } from "./element";
import { bindClickoutside, unbindClickoutside } from "./event";
import { cssPrefix } from "../config";
import { getFormInput } from "./form_input";
import { getDropdown } from "./getDropdown";
import { tf } from "../locale/locale";
import spreadsheetEvents from "../core/spreadsheetEvents";
import getIcon from "./getIcon";

const menuItems = [
  {
    key: "delete",
    title: tf("contextmenu.deleteSheet"),
  },
];

export const bottombarHeight = 41;

const getDropdownMore = (eventEmitter) => {
  const icon = getIcon("ellipsis");
  const dropdown = getDropdown(icon, "auto", false, "top-left");

  const reset = (items) => {
    const eles = items.map((it, i) =>
      h("div", `${cssPrefix}-item`)
        .css("width", "150px")
        .css("font-weight", "normal")
        .on("click", () => {
          eventEmitter.emit(spreadsheetEvents.bottombar.clickDropdownMore, i);
          dropdown.hide();
        })
        .child(it),
    );
    dropdown.setContentChildren(...eles);
  };

  return {
    dropdown,
    reset,
  };
};

const getContextMenu = (eventEmitter) => {
  const el = h("div", `${cssPrefix}-contextmenu`)
    .css("width", "160px")
    .children(...menuItems.map(buildMenuItem))
    .hide();

  const hide = () => {
    el.hide();
    unbindClickoutside(el);
  };

  const setOffset = (offset) => {
    el.offset(offset);
    el.show();

    bindClickoutside(el);
  };

  function buildMenuItem(item) {
    return h("div", `${cssPrefix}-item`)
      .child(item.title())
      .on("click", () => {
        eventEmitter.emit(
          spreadsheetEvents.bottombar.clickContextMenu,
          item.key,
        );
        hide();
      });
  }

  return {
    el,
    hide,
    setOffset,
  };
};

export const getBottombar = (eventEmitter) => {
  let dataNames = [];
  let activeEl = null;
  let deleteEl = null;
  let items = [];
  const moreEl = getDropdownMore(eventEmitter);

  const addItem = (name, active) => {
    dataNames.push(name);
    const item = h("li", active ? "active" : "").child(name);
    item
      .on("click", () => {
        clickSwap2(item);
      })
      .on("contextmenu", (evt) => {
        const { offsetLeft, offsetHeight } = evt.target;
        contextMenu.setOffset({
          left: offsetLeft,
          bottom: offsetHeight + 1,
        });
        deleteEl = item;
      })
      .on("dblclick", () => {
        const v = item.html();
        const input = getFormInput("auto", "");
        input.val(v);
        input.input.on("blur", ({ target }) => {
          const { value } = target;
          const nindex = dataNames.findIndex((it) => it === v);

          renameItem(nindex, value);
        });
        item.html("").child(input.el);
        input.focus();
      });

    if (active) {
      clickSwap(item);
    }

    items.push(item);
    menuEl.child(item);
    moreEl.reset(dataNames);
  };

  const renameItem = (index, value) => {
    dataNames.splice(index, 1, value);
    moreEl.reset(dataNames);
    items[index].html("").child(value);
    eventEmitter.emit(spreadsheetEvents.bottombar.updateSheet, index, value);
  };

  const clear = () => {
    items.forEach((it) => {
      menuEl.removeChild(it.el);
    });
    items = [];
    dataNames = [];
    moreEl.reset(dataNames);
  };

  const deleteItem = () => {
    if (items.length > 1) {
      const index = items.findIndex((it) => it === deleteEl);

      items.splice(index, 1);
      dataNames.splice(index, 1);
      menuEl.removeChild(deleteEl.el);
      moreEl.reset(dataNames);
      if (activeEl === deleteEl) {
        const [f] = items;
        activeEl = f;
        activeEl.toggle();

        eventEmitter.emit(spreadsheetEvents.bottombar.deleteSheet, index, 0);
        return;
      }
      eventEmitter.emit(spreadsheetEvents.bottombar.deleteSheet, index, -1);
      return;
    }
    eventEmitter.emit(spreadsheetEvents.bottombar.deleteSheet, -1);
  };

  const clickSwap2 = (item) => {
    const index = items.findIndex((it) => it === item);

    clickSwap(item);
    activeEl.toggle();
    eventEmitter.emit(spreadsheetEvents.bottombar.selectSheet, index);
  };

  const clickSwap = (item) => {
    if (activeEl !== null) {
      activeEl.toggle();
    }
    activeEl = item;
  };

  eventEmitter.on(spreadsheetEvents.bottombar.clickDropdownMore, (i) => {
    clickSwap2(items[i]);
  });

  const contextMenu = getContextMenu(eventEmitter);

  const menuEl = h("ul", `${cssPrefix}-menu`);
  const actionsEl = h("div", `${cssPrefix}-actions`).children(
    getIcon("add").el.on("click", () => {
      eventEmitter.emit(spreadsheetEvents.bottombar.addSheet);
    }),
    h("span", "").child(moreEl.dropdown.el),
  );

  const el = h("div", `${cssPrefix}-bottombar`).children(
    contextMenu.el,
    actionsEl,
    menuEl,
  );

  eventEmitter.on(spreadsheetEvents.bottombar.clickContextMenu, (key) => {
    if (key === "delete") {
      deleteItem();
    }
  });

  eventEmitter.on(spreadsheetEvents.sheet.addData, (name, active) => {
    addItem(name, active);
  });

  eventEmitter.on(spreadsheetEvents.sheet.setDatasheets, () => {
    clear();
  });

  return {
    el,
    menuEl,
    contextMenu,
    moreEl,
    items,
    deleteEl,
    activeEl,
    dataNames,
    addItem,
    renameItem,
    deleteItem,
    clear,
    clickSwap,
    clickSwap2,
  };
};
