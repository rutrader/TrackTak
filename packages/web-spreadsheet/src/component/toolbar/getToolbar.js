import { getMore } from "./more";

import { h } from "../element";
import { cssPrefix } from "../../config";
import { makeIconItem } from "./makeIconItem";
import { makeToggleItem } from "./makeToggleItem";
import { getDropdownItem } from "./getDropdownItem";
import { makeDropdownBorder } from "../makeDropdownBorder";
import { makeDropdownColor } from "../makeDropdownColor";
import { makeDropdownFontSize } from "../makeDropdownFontSize";
import { makeDropdownFont } from "../makeDropdownFont";
import { makeDropdownFormula } from "../makeDropdownFormula";
import { makeDropdownAlign } from "../makeDropdownAlign";
import { buildDivider } from "./buildDivider";
import { buildUndo } from "./buildUndo";
import { buildRedo } from "./buildRedo";
import { buildFormat } from "./buildFormat";
import { buildItems } from "./buildItems";
import { resize } from "./resize";
import spreadsheetEvents from "../../core/spreadsheetEvents";

export const toolbarHeight = 41;

export const getToolbar = (getOptions, getData, eventEmitter) => {
  const hideFn = () => !getOptions().showToolbar;
  const widthFn = () => getOptions().view.width();

  const getIconItem = makeIconItem(eventEmitter);
  const getToggleItem = makeToggleItem(eventEmitter);
  const undoEl = buildUndo(eventEmitter);
  const redoEl = buildRedo(eventEmitter);
  const formatEl = buildFormat(getOptions, getData, eventEmitter);
  const printEl = getIconItem("print", "Ctrl+P");
  const paintformatEl = getToggleItem("paintformat");
  const clearformatEl = getIconItem("clearformat");
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
    makeDropdownColor(() => getOptions().style.color, "color", eventEmitter),
  );
  const fillColorEl = getDropdownItem(
    "bgcolor",
    makeDropdownColor(
      () => getOptions().style.bgcolor,
      "bgcolor",
      eventEmitter,
    ),
  );
  const borderEl = getDropdownItem("border", makeDropdownBorder(eventEmitter));
  const mergeEl = getToggleItem("merge");
  const alignEl = getDropdownItem(
    "align",
    makeDropdownAlign(
      () => getOptions().style.align,
      ["left", "center", "right"],
      eventEmitter,
    ),
  );
  const valignEl = getDropdownItem(
    "valign",
    makeDropdownAlign(
      () => getOptions().style.valign,
      ["top", "middle", "bottom"],
      eventEmitter,
    ),
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
    [formatEl],
    buildDivider(),
    [undoEl, redoEl],
    // [undoEl, redoEl, printEl, paintformatEl, clearformatEl],
    // buildDivider(),
    // [fontEl, fontSizeEl],
    // buildDivider(),
    // [boldEl, italicEl, underlineEl, strikeEl, textColorEl],
    // buildDivider(),
    // [fillColorEl, borderEl, mergeEl],
    // buildDivider(),
    // [alignEl, valignEl, textwrapEl],
    buildDivider(),
    // [freezeEl, autofilterEl, formulaEl, moreEl],
    [moreEl],
  ];

  const el = h("div", `${cssPrefix}-toolbar`);
  const buttonsEl = h("div", `${cssPrefix}-toolbar-btns`);

  buildItems(items, buttonsEl);

  el.child(buttonsEl);

  eventEmitter.on(spreadsheetEvents.sheet.switchData, (newData) => {
    reset(hideFn(), newData, undoEl, redoEl, formatEl);

    resize(hideFn(), items, reset, el, buttonsEl, moreEl, widthFn);
  });

  eventEmitter.on(spreadsheetEvents.sheet.cellSelected, () => {
    reset();
  });

  eventEmitter.on(spreadsheetEvents.sheet.cellsSelected, () => {
    reset();
  });

  eventEmitter.on(spreadsheetEvents.sheet.sheetReset, () => {
    reset();
  });

  const paintformatActive = () => {
    return paintformatEl.toggleItem.active();
  };

  const paintformatToggle = () => {
    paintformatEl.toggleItem.toggle();
  };

  const reset = () => {
    if (hideFn()) return;
    const style = getData().getSelectedCellStyle();

    undoEl.iconItem.setDisabled(!getData().canUndo());
    redoEl.iconItem.setDisabled(!getData().canRedo());
    mergeEl.toggleItem.setActive(getData().canUnmerge());
    mergeEl.item.el.disabled(!getData().selector.multiple());
    autofilterEl.toggleItem.setActive(!getData().canAutofilter());

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
    freezeEl.toggleItem.setActive(getData().freezeIsActive());
  };

  return {
    paintformatActive,
    paintformatToggle,
    el,
    reset,
    strikeEl,
    underlineEl,
    boldEl,
    italicEl,
  };
};
