import { cssPrefix } from "../../config";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { h } from "../element";
import { getEditableInput } from "./getEditableInput";

export const getFormulaBar = (getData, formulas, eventEmitter) => {
  const el = h("div", `${cssPrefix}-formula-bar`);

  const editableInput = getEditableInput(
    getData,
    formulas,
    eventEmitter,
    el,
    "formulaBar",
  );
  const fxIcon = h("div", `${cssPrefix}-icon-fx`);

  const textareaContainer = h(
    "div",
    `${cssPrefix}-textarea-container`,
  ).children(fxIcon, editableInput.textEl);

  editableInput.areaEl.children(
    textareaContainer,
    editableInput.suggest.el,
    editableInput.datepicker.el,
  );

  eventEmitter.on(spreadsheetEvents.sheet.cellSelected, (cell) => {
    if (cell) {
      editableInput.setText(cell.text);
    }
  });

  eventEmitter.on(spreadsheetEvents.editor.change, (_, text) => {
    if (text !== editableInput.textEl.el.textContent) {
      editableInput.setText(text);
    }
  });

  return {
    ...editableInput,
  };
};
