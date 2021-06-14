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

  const reset = (names) => {
    const eles = names.map((name, i) =>
      h("div", `${cssPrefix}-item`)
        .css("width", "150px")
        .css("font-weight", "normal")
        .on("click", () => {
          eventEmitter.emit(spreadsheetEvents.bottombar.clickDropdownMore, i);
          dropdown.hide();
        })
        .child(name),
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

export const getBottombar = (
  eventEmitter,
  getDataValues,
  getDataValue,
  getOptions,
) => {
  const getSheetNames = () => getDataValues().map((x) => x.name);

  let items = [];
  let previousIndex = null;
  let deleteIndex = null;
  const moreEl = getDropdownMore(eventEmitter);

  const addItem = (name, active, i) => {
    if (active) {
      previousIndex = i;
    }

    const item = h("li", active ? "active" : "")
      .child(name)
      .on("click", () => {
        click(i);
      })
      .on("contextmenu", (evt) => {
        const { offsetLeft, offsetHeight } = evt.target;

        contextMenu.setOffset({
          left: offsetLeft,
          bottom: offsetHeight + 1,
        });
        deleteIndex = i;
      })
      .on("dblclick", () => {
        const v = item.html();
        const input = getFormInput("auto", "");
        input.val(v);
        input.input.on("blur", ({ target }) => {
          const { value } = target;

          renameItem(i, value);
        });
        item.html("").child(input.el);
        input.focus();
      });

    menuEl.child(item);

    return item;
  };

  const setItems = (dataSheets) => {
    items = dataSheets.map(({ name, active }, i) => {
      const item = addItem(name, active, i);

      return item;
    });
  };

  const renameItem = (index, value) => {
    eventEmitter.emit(spreadsheetEvents.bottombar.updateSheet, index, value);
    moreEl.reset(getSheetNames());
    items[index].html("").child(value);
  };

  const deleteItem = () => {
    if (items.length > 1) {
      const newIndex = 0;

      eventEmitter.emit(
        spreadsheetEvents.bottombar.deleteSheet,
        deleteIndex,
        newIndex,
      );
      clear();
      setItems(getDataValues());
      items[newIndex].toggle();
      previousIndex = newIndex;
    }
  };

  const clear = () => {
    items.forEach((it) => {
      menuEl.removeChild(it.el);
    });
    items = [];
    moreEl.reset(getSheetNames());
  };

  const click = (index) => {
    // Do not toggle the same sheet
    if (index !== previousIndex) {
      // Set the previous one unactive
      items[previousIndex].toggle();
      // Set the current one active
      items[index].toggle();
    }

    previousIndex = index;

    eventEmitter.emit(spreadsheetEvents.bottombar.selectSheet, index);
  };

  eventEmitter.on(spreadsheetEvents.bottombar.clickDropdownMore, (i) => {
    click(i);
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
    items[previousIndex].toggle();

    const item = addItem(name, active, items.length);

    items.push(item);
  });

  eventEmitter.on(spreadsheetEvents.sheet.setDatasheets, (dataSheets) => {
    clear();
    setItems(dataSheets);
  });

  return {
    el,
    menuEl,
    contextMenu,
    moreEl,
    items,
    renameItem,
    deleteItem,
  };
};
