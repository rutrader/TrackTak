import { cssPrefix } from "../../config";
import { setCaretPosition } from "../../core/caret";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import getCaretPositionIndex from "../../shared/getCaretPositionIndex";
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

  eventEmitter.on(spreadsheetEvents.editor.clear, () => {
    el.hide();
  });

  eventEmitter.on(spreadsheetEvents.editor.setText, (text, format) => {
    el.show();
    // firefox bug
    editableInput.textEl.el.blur();

    setTimeout(() => {
      setCaretPosition(
        editableInput.textEl.el,
        getCaretPositionIndex(text, format),
      );
    });
  });

  eventEmitter.on(spreadsheetEvents.formulaBar.change, (_, text) => {
    editableInput.setInputText(text);
  });

  return {
    ...editableInput,
  };
};
