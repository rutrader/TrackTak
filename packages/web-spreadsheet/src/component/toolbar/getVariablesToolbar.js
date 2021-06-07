import { getMore } from "./more";

import { h } from "../element";
import { cssPrefix } from "../../config";
import { buildDivider } from "./buildDivider";
import { buildUndo } from "./buildUndo";
import { buildRedo } from "./buildRedo";
import { buildFormat } from "./buildFormat";
import { buildItems } from "./buildItems";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { resize } from "./resize";

export const getVariablesToolbar = (getOptions, getData, eventEmitter) => {
  const hideFn = () => !getOptions().show;
  const widthFn = () => getOptions().view.width();

  const undoEl = buildUndo(eventEmitter);
  const redoEl = buildRedo(eventEmitter);
  const formatEl = buildFormat(getOptions, getData, eventEmitter);
  const moreEl = getMore();

  const items = [
    [formatEl],
    buildDivider(),
    // TODO: Fix triggering the url and then add it back
    // [undoEl, redoEl],
    // buildDivider(),
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
