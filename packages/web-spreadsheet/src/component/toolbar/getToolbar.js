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
import { makeDropdownFunction } from "../makeDropdownFunction";
import { makeDropdownAlign } from "../makeDropdownAlign";
import { buildDivider } from "./buildDivider";
import { buildUndo } from "./buildUndo";
import { buildRedo } from "./buildRedo";
import { buildFormat } from "./buildFormat";
import { buildItems } from "./buildItems";
import { resize } from "./resize";
import spreadsheetEvents from "../../core/spreadsheetEvents";

export const toolbarHeight = 41;

export const getToolbar = (
  getOptions,
  getData,
  rangeSelector,
  history,
  eventEmitter,
) => {
  const hideFn = () => !getOptions().showToolbar;
  const widthFn = () => getOptions().view.width();

  let undoEl;
  let redoEl;
  let formatEl;
  let printEl;
  let paintformatEl;
  let clearformatEl;
  let fontEl;
  let fontSizeEl;
  let boldEl;
  let italicEl;
  let underlineEl;
  let strikeEl;
  let textColorEl;
  let fillColorEl;
  let borderEl;
  let mergeEl;
  let alignEl;
  let valignEl;
  let textwrapEl;
  let freezeEl;
  let autofilterEl;
  let functionsEl;
  let percentIncreaseEl;
  let formulasEl;
  let exportEl;
  let moreEl;

  let leftItems;
  let leftButtonsEl = h("div", `${cssPrefix}-toolbar-btns left`);
  let el = h("div", `${cssPrefix}-toolbar`);

  el.children(leftButtonsEl);

  const createItems = () => {
    const getIconItem = makeIconItem(eventEmitter);
    const getToggleItem = makeToggleItem(eventEmitter);

    undoEl = buildUndo(eventEmitter);
    redoEl = buildRedo(eventEmitter);
    formatEl = buildFormat(getOptions, getData, eventEmitter);
    printEl = getIconItem("print", "Ctrl+P");
    paintformatEl = getToggleItem("paintformat");
    clearformatEl = getIconItem("clearformat");
    fontEl = getDropdownItem("font-name", makeDropdownFont(eventEmitter));
    fontSizeEl = getDropdownItem(
      "font-size",
      makeDropdownFontSize(eventEmitter),
    );
    boldEl = getToggleItem("font-bold", "Ctrl+B");
    italicEl = getToggleItem("font-italic", "Ctrl+I");
    underlineEl = getToggleItem("underline", "Ctrl+U");
    strikeEl = getToggleItem("strike", "Ctrl+S");
    textColorEl = getDropdownItem(
      "color",
      makeDropdownColor(() => getOptions().style.color, "color", eventEmitter),
    );
    fillColorEl = getDropdownItem(
      "bgcolor",
      makeDropdownColor(
        () => getOptions().style.bgcolor,
        "bgcolor",
        eventEmitter,
      ),
    );
    borderEl = getDropdownItem("border", makeDropdownBorder(eventEmitter));
    mergeEl = getToggleItem("merge");
    alignEl = getDropdownItem(
      "align",
      makeDropdownAlign(
        () => getOptions().style.align,
        ["left", "center", "right"],
        eventEmitter,
      ),
    );
    valignEl = getDropdownItem(
      "valign",
      makeDropdownAlign(
        () => getOptions().style.valign,
        ["top", "middle", "bottom"],
        eventEmitter,
      ),
    );
    textwrapEl = getToggleItem("textwrap");
    freezeEl = getToggleItem("freeze");
    autofilterEl = getToggleItem("autofilter");
    functionsEl = getDropdownItem(
      "function",
      makeDropdownFunction(eventEmitter),
    );
    percentIncreaseEl = getToggleItem("yoyGrowth");
    formulasEl = getToggleItem("formula");
    exportEl = getIconItem("export");
    moreEl = getMore();

    leftItems = [
      [formatEl],
      buildDivider(),
      [undoEl, redoEl, printEl, paintformatEl, clearformatEl],
      buildDivider(),
      [fontEl, fontSizeEl],
      buildDivider(),
      [boldEl, italicEl, underlineEl, strikeEl, textColorEl],
      buildDivider(),
      [fillColorEl, borderEl, mergeEl],
      buildDivider(),
      [alignEl, valignEl, textwrapEl],
      buildDivider(),
      [freezeEl, autofilterEl, functionsEl],
      [formulasEl, percentIncreaseEl, exportEl, moreEl],
    ];

    formulasEl.item.el.addClass("align-right");

    const children = buildItems(leftItems);

    leftButtonsEl.el.replaceChildren(...children);
  };

  createItems();

  eventEmitter.on(spreadsheetEvents.sheet.switchData, () => {
    reset();

    resize(hideFn(), leftItems, reset, el, leftButtonsEl, moreEl, widthFn);
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

  eventEmitter.on(spreadsheetEvents.sheet.ctrlKeyDown, (evt, keyCode) => {
    // ctrl + s
    if (keyCode === 83) {
      evt.preventDefault();

      strikeEl.toggleItem.toggle();
    }

    // ctrl + u
    if (keyCode === 85) {
      evt.preventDefault();

      underlineEl.toggleItem.toggle();
    }

    // ctrl + b
    if (keyCode === 66) {
      boldEl.toggleItem.toggle();
    }

    // ctrl + i
    if (keyCode === 73) {
      italicEl.toggleItem.toggle();
    }
  });

  const paintformatActive = () => {
    return paintformatEl.toggleItem.active();
  };

  const paintformatToggle = () => {
    paintformatEl.toggleItem.toggle();
  };

  const reset = () => {
    undoEl.iconItem.setDisabled(!history.canUndo);
    redoEl.iconItem.setDisabled(!history.canRedo);

    if (hideFn() || !getData()) return;
    const style = getData().getSelectedCellStyle();

    mergeEl.toggleItem.setActive(getData().canUnmerge());
    mergeEl.item.el.disabled(!rangeSelector.range.multiple());
    autofilterEl.toggleItem.setActive(!getData().canAutofilter());

    const { font, format } = style;

    formatEl.dropdown.setTitle(format);
    fontEl.dropdown.dropdown.setTitle(font.name);
    fontSizeEl.dropdown.dropdown.setTitle(font.size);
    boldEl.toggleItem.setActive(font.bold);
    percentIncreaseEl.toggleItem.setActive(getOptions().showYOYGrowth);
    formulasEl.toggleItem.setActive(getOptions().showAllFormulas);
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
    createItems,
  };
};
