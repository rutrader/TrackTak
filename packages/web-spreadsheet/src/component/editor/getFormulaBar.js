import { cssPrefix } from "../../config";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { h } from "../element";
import { getEditableInput } from "./getEditableInput";

export const getFormulaBar = (
  getOptions,
  getData,
  formulas,
  eventEmitter,
  hyperformula,
) => {
  const el = h("div", `${cssPrefix}-formula-bar`);

  const editableInput = getEditableInput(
    getData,
    getOptions,
    formulas,
    eventEmitter,
    el,
    hyperformula,
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

  eventEmitter.on(spreadsheetEvents.sheet.cellSelected, (_, cellText) => {
    editableInput.setText(cellText);
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
