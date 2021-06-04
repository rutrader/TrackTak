import { getMore } from "./more";

import { h } from "../element";
import { cssPrefix } from "../../config";
import { buildDivider } from "./buildDivider";
import { buildUndo } from "./buildUndo";
import { buildRedo } from "./buildRedo";
import { buildFormat } from "./buildFormat";
import { buildItems } from "./buildItems";

export const getVariablesToolbar = (getOptions, getData, eventEmitter) => {
  const hideFn = () => !getOptions().showVariablesSpreadsheet;

  const undoEl = buildUndo(eventEmitter);
  const redoEl = buildRedo(eventEmitter);
  const formatEl = buildFormat(
    () => getOptions().formats,
    () => getData().getData().styles,
    eventEmitter,
  );
  const moreEl = getMore();

  const items = [
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
