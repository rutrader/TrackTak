import { cssPrefix } from "../../config";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { h } from "../element";
import { getEditableInput } from "./getEditableInput";

export const getEditor = (
  getData,
  getOptions,
  formulas,
  eventEmitter,
  hyperformula,
) => {
  const el = h("div", `${cssPrefix}-editor`).hide();

  const editableInput = getEditableInput(
    getData,
    getOptions,
    formulas,
    eventEmitter,
    el,
    hyperformula,
    "editor",
  );

  editableInput.areaEl.children(
    editableInput.textEl,
    editableInput.textlineEl,
    editableInput.suggest.el,
    editableInput.datepicker.el,
  );

  eventEmitter.on(spreadsheetEvents.editor.clear, () => {
    el.hide();
  });

  eventEmitter.on(spreadsheetEvents.sheet.clickOutside, () => {
    el.hide();
  });

  eventEmitter.on(spreadsheetEvents.editor.setText, () => {
    el.show();
  });

  eventEmitter.on(spreadsheetEvents.formulaBar.change, (_, text) => {
    editableInput.setInputText(text);
  });

  eventEmitter.on(spreadsheetEvents.formulaBar.click, () => {
    el.show();
  });

  return {
    ...editableInput,
  };
};
