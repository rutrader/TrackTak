import { cssPrefix } from "../../config";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { h } from "../element";
import { getEditableInput } from "./getEditableInput";

export const getFormulaBar = (getOptions, getData, formulas, eventEmitter) => {
  const el = h("div", `${cssPrefix}-formula-bar`);

  const editableInput = getEditableInput(
    getData,
    getOptions,
    formulas,
    eventEmitter,
    el,
    "formulaBar",
  );
  const fxIcon = h("div", `${cssPrefix}-icon-img formula`);
  const icon = h("div", `${cssPrefix}-icon`).child(fxIcon);

  const textareaContainer = h(
    "div",
    `${cssPrefix}-textarea-container`,
  ).children(icon, editableInput.textEl);

  editableInput.areaEl.children(
    textareaContainer,
    editableInput.suggest.el,
    editableInput.datepicker.el,
  );

  editableInput.textEl.on("click", () => {
    eventEmitter.emit(spreadsheetEvents.formulaBar.click);
  });

  eventEmitter.on(spreadsheetEvents.sheet.cellSelected, (_, cellText) => {
    editableInput.setText(cellText);
  });

  eventEmitter.on(spreadsheetEvents.sheet.cellEdit, ({ value }) => {
    if (value !== editableInput.textEl.el.textContent) {
      editableInput.setText(value);
    }
  });

  return {
    ...editableInput,
  };
};
