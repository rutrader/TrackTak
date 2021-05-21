import { getMore } from "./more";

import { h } from "../element";
import { cssPrefix } from "../../config";
import { getDropdownItem } from "./getDropdownItem";
import { makeDropdownVariablesSheet } from "../makeDropdownVariablesSheet";
import { buildDivider } from "./buildDivider";
import { buildUndo } from "./buildUndo";
import { buildRedo } from "./buildRedo";
import { buildFormat } from "./buildFormat";
import { buildItems } from "./buildItems";
import { resize } from "./resize";

export const getVariablesToolbar = (
  data,
  widthFn,
  formats,
  eventEmitter,
  isHide = false,
) => {
  const variables = [
    { title: "Inputs" },
    { title: "Optional Inputs" },
    { title: "API" },
  ];

  const toolbarType = "variablesToolbar";
  const variablesSheetDropdown = getDropdownItem(
    "variables-sheet",
    makeDropdownVariablesSheet(eventEmitter, variables),
  );
  const undoEl = buildUndo(eventEmitter, toolbarType);
  const redoEl = buildRedo(eventEmitter, toolbarType);
  const formatEl = buildFormat(formats, eventEmitter, toolbarType);
  const moreEl = getMore();

  let items = [];

  if (variables) {
    items.push([variablesSheetDropdown]);
  }

  items = [
    ...items,
    [formatEl],
    buildDivider(),
    [undoEl, redoEl],
    buildDivider(),
    [moreEl],
  ];

  const el = h("div", `${cssPrefix}-toolbar`);
  const buttonsEl = h("div", `${cssPrefix}-toolbar-btns`);

  buildItems(items, buttonsEl);

  el.child(buttonsEl);

  const resetData = (datum) => {
    data = datum;
    reset();
  };

  const reset = () => {
    if (isHide) return;

    const style = data.getSelectedCellStyle();

    undoEl.iconItem.setDisabled(!data.canUndo());
    redoEl.iconItem.setDisabled(!data.canRedo());

    const { format } = style;

    formatEl.dropdown.setTitle(format);
  };

  return {
    el,
    reset,
    resetData,
    resize: () => resize(isHide, items, reset, el, buttonsEl, moreEl, widthFn),
  };
};
