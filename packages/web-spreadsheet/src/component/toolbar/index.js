import { getMore } from "./more";

import { h } from "../element";
import { cssPrefix } from "../../config";
import { bind } from "../event";
import { makeIconItem } from "./makeIconItem";
import { makeToggleItem } from "./makeToggleItem";
import { getDropdownItem } from "./getDropdownItem";
import { makeDropdownBorder } from "../makeDropdownBorder";
import { makeDropdownColor } from "../makeDropdownColor";
import { makeDropdownFontSize } from "../makeDropdownFontSize";
import { makeDropdownFont } from "../makeDropdownFont";
import { makeDropdownFormat } from "../makeDropdownFormat";
import { makeDropdownFormula } from "../makeDropdownFormula";
import { makeDropdownAlign } from "../makeDropdownAlign";

function buildDivider() {
  return h("div", `${cssPrefix}-toolbar-divider`);
}

export const getToolbar = (
  data,
  widthFn,
  formats,
  eventEmitter,
  isHide = false,
) => {
  const style = data.defaultStyle();

  const getIconItem = makeIconItem(eventEmitter);
  const getToggleItem = makeToggleItem(eventEmitter);

  const undoEl = getIconItem("undo", "Ctrl+Z");
  const redoEl = getIconItem("redo", "Ctrl+Y");
  const printEl = getIconItem("print", "Ctrl+P");
  const paintformatEl = getToggleItem("paintformat");
  const clearformatEl = getIconItem("clearformat");
  const formatEl = getDropdownItem(
    "format",
    makeDropdownFormat(formats, eventEmitter),
  );
  const fontEl = getDropdownItem("font-name", makeDropdownFont(eventEmitter));
  const fontSizeEl = getDropdownItem(
    "font-size",
    makeDropdownFontSize(eventEmitter),
  );
  const boldEl = getToggleItem("font-bold", "Ctrl+B");
  const italicEl = getToggleItem("font-italic", "Ctrl+I");
  const underlineEl = getToggleItem("underline", "Ctrl+U");
  const strikeEl = getToggleItem("strike", "Ctrl+S");
  const textColorEl = getDropdownItem(
    "color",
    makeDropdownColor("color", style.color, eventEmitter),
  );
  const fillColorEl = getDropdownItem(
    "bgcolor",
    makeDropdownColor("bgcolor", style.bgcolor, eventEmitter),
  );
  const borderEl = getDropdownItem("border", makeDropdownBorder(eventEmitter));
  const mergeEl = getToggleItem("merge");
  const alignEl = getDropdownItem(
    "align",
    makeDropdownAlign(["left", "center", "right"], style.align, eventEmitter),
  );
  const valignEl = getDropdownItem(
    "valign",
    makeDropdownAlign(["top", "middle", "bottom"], style.valign, eventEmitter),
  );
  const textwrapEl = getToggleItem("textwrap");
  const freezeEl = getToggleItem("freeze");
  const autofilterEl = getToggleItem("autofilter");
  const formulaEl = getDropdownItem(
    "formula",
    makeDropdownFormula(eventEmitter),
  );
  const moreEl = getMore();

  const items = [
    [undoEl, redoEl, printEl, paintformatEl, clearformatEl],
    buildDivider(),
    [formatEl],
    buildDivider(),
    [fontEl, fontSizeEl],
    buildDivider(),
    [boldEl, italicEl, underlineEl, strikeEl, textColorEl],
    buildDivider(),
    [fillColorEl, borderEl, mergeEl],
    buildDivider(),
    [alignEl, valignEl, textwrapEl],
    buildDivider(),
    [freezeEl, autofilterEl, formulaEl, moreEl],
  ];

  const el = h("div", `${cssPrefix}-toolbar`);
  const btnsEl = h("div", `${cssPrefix}-toolbar-btns`);

  items.forEach((it) => {
    if (Array.isArray(it)) {
      it.forEach((i) => {
        const iEl = i.el ? i.el : i.item.el;

        btnsEl.child(iEl);
      });
    } else {
      const itEl = it.el ? it.el : it.item.el;

      btnsEl.child(itEl);
    }
  });

  el.child(btnsEl);

  const paintformatActive = () => {
    return paintformatEl.toggleItem.active();
  };

  const paintformatToggle = () => {
    paintformatEl.toggleItem.toggle();
  };

  const resetData = (datum) => {
    data = datum;
    reset();
  };

  const reset = () => {
    if (isHide) return;
    const style = data.getSelectedCellStyle();

    undoEl.iconItem.setDisabled(!data.canUndo());
    redoEl.iconItem.setDisabled(!data.canRedo());
    mergeEl.toggleItem.setActive(data.canUnmerge());
    mergeEl.item.el.disabled(!data.selector.multiple());
    autofilterEl.toggleItem.setActive(!data.canAutofilter());

    const { font, format } = style;

    formatEl.dropdown.setTitle(format);
    fontEl.dropdown.dropdown.setTitle(font.name);
    fontSizeEl.dropdown.dropdown.setTitle(font.size);
    boldEl.toggleItem.setActive(font.bold);
    italicEl.toggleItem.setActive(font.italic);
    underlineEl.toggleItem.setActive(style.underline);
    strikeEl.toggleItem.setActive(style.strike);
    textColorEl.dropdown.setTitle(style.color);
    fillColorEl.dropdown.setTitle(style.bgcolor);
    alignEl.dropdown.setTitle(style.align);
    valignEl.dropdown.setTitle(style.valign);
    textwrapEl.toggleItem.setActive(style.textwrap);
    freezeEl.toggleItem.setActive(data.freezeIsActive());
  };

  function initBtns() {
    const btns = [];

    items.forEach((it) => {
      if (Array.isArray(it)) {
        it.forEach(({ el, item }) => {
          let newEl = el ? el : item.el;
          const rect = newEl.box();
          const { marginLeft, marginRight } = newEl.computedStyle();
          btns.push([
            newEl,
            rect.width + parseInt(marginLeft, 10) + parseInt(marginRight, 10),
          ]);
        });
      } else {
        const rect = it.box();
        const { marginLeft, marginRight } = it.computedStyle();
        btns.push([
          it,
          rect.width + parseInt(marginLeft, 10) + parseInt(marginRight, 10),
        ]);
      }
    });

    return btns;
  }

  function moreResize(btns) {
    el.css("width", `${widthFn() - 60}px`);
    const elBox = el.box();

    let sumWidth = 160;
    let sumWidth2 = 12;
    const list1 = [];
    const list2 = [];
    btns.forEach(([it, w], index) => {
      sumWidth += w;
      if (index === btns.length - 1 || sumWidth < elBox.width) {
        list1.push(it);
      } else {
        sumWidth2 += w;
        list2.push(it);
      }
    });
    btnsEl.html("").children(...list1);
    moreEl.dropdown.dropdown.moreBtns.html("").children(...list2);
    moreEl.dropdown.dropdown.dropdown.contentEl.css("width", `${sumWidth2}px`);
    if (list2.length > 0) {
      moreEl.show();
    } else {
      moreEl.hide();
    }
  }

  if (isHide) {
    el.hide();
  } else {
    reset();
    setTimeout(() => {
      const btns = initBtns();
      moreResize(btns);
    }, 0);
    bind(window, "resize", () => {
      const btns = initBtns();
      moreResize(btns);
    });
  }

  return {
    paintformatActive,
    paintformatToggle,
    el,
    reset,
    resetData,
    strikeEl,
    underlineEl,
    boldEl,
    italicEl,
  };
};
