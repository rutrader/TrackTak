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

export const getVariablesToolbar = (getOptions, getData, eventEmitter) => {
  const hideFn = () => !getOptions().showVariablesSpreadsheet;
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
  const formatEl = buildFormat(
    () => getOptions().formats,
    eventEmitter,
    toolbarType,
  );
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

  const reset = () => {
    if (hideFn()) return;

    const style = getData().getSelectedCellStyle();

    undoEl.iconItem.setDisabled(!getData().canUndo());
    redoEl.iconItem.setDisabled(!getData().canRedo());

    const { format } = style;

    formatEl.dropdown.setTitle(format);
  };

  return {
    el,
    reset,
  };
};
