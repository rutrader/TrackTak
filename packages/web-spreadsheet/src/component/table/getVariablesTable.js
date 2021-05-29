import spreadsheetEvents from "../../core/spreadsheetEvents";
import { makeGetViewWidthHeight } from "../makeGetViewWidthHeight";
import { makeTable } from "./makeTable";

export const getVariablesTable = (
  getOptions,
  getData,
  hyperformula,
  eventEmitter,
) => {
  const getViewWidthHeight = makeGetViewWidthHeight(getOptions, true);

  const { clear, render, el, draw, getOffset } = makeTable({
    getViewWidthHeight,
    getOptions,
    getData,
    hyperformula,
  });

  eventEmitter.on(spreadsheetEvents.sheet.switchData, () => {
    render();
  });

  return {
    el,
    draw,
    hyperformula,
    render,
    clear,
    getOffset,
  };
};
