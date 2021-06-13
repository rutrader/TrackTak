import { cssPrefix } from "../../config";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { h } from "../element";
import { getEditableInput } from "./getEditableInput";

export const getEditor = (getData, getOptions, formulas, eventEmitter) => {
  const el = h("div", `${cssPrefix}-editor`).hide();

  const editableInput = getEditableInput(
    getData,
    getOptions,
    formulas,
    eventEmitter,
    el,
    "editor",
  );

  editableInput.areaEl.children(
    editableInput.textEl,
    editableInput.textlineEl,
    editableInput.suggest.el,
    editableInput.datepicker.el,
  );

  editableInput.textEl.el.addEventListener("keydown", (e) => {
    const keyCode = e.keyCode || e.which;

    // escape
    if (keyCode === 27) {
      return editableInput.clear();
    }
  });

  eventEmitter.on(spreadsheetEvents.editor.clear, () => {
    el.hide();
  });

  eventEmitter.on(spreadsheetEvents.editor.setText, () => {
    el.show();
  });

  eventEmitter.on(spreadsheetEvents.formulaBar.change, (_, text) => {
    editableInput.setInputText(text);
  });

  return {
    ...editableInput,
  };
};
