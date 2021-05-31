import { cssPrefix } from "../../config";
import { setCaretPosition } from "../../core/caret";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { h } from "../element";
import { getEditableInput } from "./getEditableInput";

export const getEditor = (getData, formulas, eventEmitter) => {
  const el = h("div", `${cssPrefix}-editor`).hide();

  const editableInput = getEditableInput(
    getData,
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

  eventEmitter.on(spreadsheetEvents.editor.clear, () => {
    el.hide();
  });

  eventEmitter.on(spreadsheetEvents.editor.setText, (text) => {
    el.show();
    // firefox bug
    editableInput.textEl.el.blur();

    setTimeout(() => {
      setCaretPosition(editableInput.textEl.el, text.length);
    });
  });

  eventEmitter.on(spreadsheetEvents.formulaBar.change, (_, text) => {
    const { ri, ci } = getData().selector;

    editableInput.setCell(
      getData().getSelectedCell(),
      getData().getSelectedValidator(),
    );

    // editableInput.formulaSelectCell(ri, ci);

    if (text !== editableInput.textEl.el.textContent) {
      editableInput.setText(text);
    }
  });

  return {
    ...editableInput,
  };
};
