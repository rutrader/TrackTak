import { h } from "../element";
import Suggest from "../suggest";
import Datepicker from "../datepicker";
import { cssPrefix } from "../../config";
import Formula from "../formula";
import { saveCaretPosition, setCaretPosition } from "../../core/caret";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { dateFormat } from "../../shared/dateFormat";
import getFormatFromCell from "../../shared/getFormatFromCell";
import setTextFormat from "../../shared/setTextFormat";
import getCaretPositionIndex from "../../shared/getCaretPositionIndex";

export const getEditableInput = (
  getData,
  getOptions,
  formulas,
  eventEmitter,
  el,
  hyperformula,
  eventType,
) => {
  function insertText({ target }, itxt) {
    const { value, selectionEnd } = target;
    const ntxt = `${value.slice(0, selectionEnd)}${itxt}${value.slice(
      selectionEnd,
    )}`;
    target.value = ntxt;
    inputText = ntxt;
    render();

    setCaretPosition(target, selectionEnd + 1);
  }

  function keydownEventHandler(evt) {
    const { keyCode, altKey } = evt;
    if (keyCode !== 13 && keyCode !== 9 && keyCode !== 27) {
      evt.stopPropagation();
    }
    if (keyCode === 13 && altKey) {
      insertText(evt, "\n");
      evt.stopPropagation();
    }

    if (keyCode === 27) {
      resetCellText();
    }

    if (keyCode === 13 && !altKey) {
      evt.preventDefault();
    }
  }

  const resetCellText = () => {
    setCell(initialText, initialCell);
    setInputText(initialText);
    clear();
  };

  const setInputText = (text) => {
    const format = getFormatFromCell(_cell, getData().getData().styles);

    inputText = setTextFormat(text, format, getOptions().formats, "input");

    if (_validator) {
      if (_validator.type === "list") {
        suggest.search(inputText);
      } else {
        suggest.hide();
      }
    } else {
      const start = inputText.lastIndexOf("=");
      if (start !== -1) {
        suggest.search(inputText.substring(start + 1));
      } else {
        suggest.hide();
      }
    }
    render();

    eventEmitter.emit(spreadsheetEvents[eventType].change, "input", inputText);
  };

  function inputEventHandler() {
    const restore = saveCaretPosition(textEl.el);

    setInputText(textEl.el.textContent);

    restore();
  }

  function suggestItemClick(it) {
    let position = 0;
    if (_validator && _validator.type === "list") {
      inputText = it;
      position = inputText.length;
    } else {
      const start = inputText.lastIndexOf("=");
      const sit = inputText.substring(0, start + 1);
      let eit = inputText.substring(start + 1);
      if (eit.indexOf(")") !== -1) {
        eit = eit.substring(eit.indexOf(")"));
      } else {
        eit = "";
      }
      inputText = `${sit + it}(`;
      position = inputText.length;
      inputText += `)${eit}`;
    }
    render();
    setCaretPosition(textEl.el, position);
  }

  function resetSuggestItems() {
    suggest.setItems(formulas);
  }

  const render = () => {
    if (composing) return;

    const text = inputText ?? "";

    if (text[0] !== "=") {
      textEl.html(text);
    } else {
      formula.render();
    }

    textlineEl.html(text);
  };

  const suggest = new Suggest(formulas, (it) => {
    const unescapedKey = it.key.replace("\\.", ".");
    suggestItemClick(unescapedKey);
  });

  const datepicker = new Datepicker();
  datepicker.change((d) => {
    // console.log('d:', d);
    setText(dateFormat(d));
    clear();
  });
  let composing = false;
  let textEl = h("div", "textarea")
    .attr("contenteditable", "true")
    .on("input", (evt) => inputEventHandler(evt))
    .on("paste.stop", () => {})
    .on("keydown", (evt) => keydownEventHandler(evt))
    .on("compositionstart.stop", () => (composing = true))
    .on("compositionend.stop", () => (composing = false));

  let textlineEl = h("div", "textline");

  const areaEl = h("div", `${cssPrefix}-editor-area`)
    .on("mousemove.stop", () => {})
    .on("mousedown.stop", () => {})
    .on("touchstart.stop", () => {});

  el.children(areaEl);

  const cellEl = h("div", `${cssPrefix}-formula-cell`);

  suggest.bindInputEvents(textEl);

  let _validator;
  let areaOffset = null;
  const freeze = { w: 0, h: 0 };
  let _cell = null;
  let initialCell = null;
  let _indexes = null;
  let initialText = null;
  let inputText = "";

  const getInputText = () => inputText;

  const clear = () => {
    if (_cell) {
      eventEmitter.emit(
        spreadsheetEvents[eventType].change,
        "finished",
        inputText,
      );
    }

    _cell = null;
    areaOffset = null;
    initialCell = null;
    inputText = "";
    textEl.val("");
    textlineEl.html("");
    formula.clear();
    resetSuggestItems();
    datepicker.hide();
    eventEmitter.emit(spreadsheetEvents[eventType].clear);
  };

  const setFreezeLengths = (width, height) => {
    freeze.w = width;
    freeze.h = height;
  };

  const setOffset = (offset, suggestPosition = "top") => {
    if (offset) {
      areaOffset = offset;
      const { left, top, width, height, l, t } = offset;

      const elOffset = { left: 0, top: 0 };

      if (freeze.w > l && freeze.h > t) {
      } else if (freeze.w < l && freeze.h < t) {
        elOffset.left = freeze.w;
        elOffset.top = freeze.h;
      } else if (freeze.w > l) {
        elOffset.top = freeze.h;
      } else if (freeze.h > t) {
        elOffset.left = freeze.w;
      }
      el.offset(elOffset);
      areaEl.offset({
        left: left - elOffset.left - 0.8,
        top: top - elOffset.top - 0.8,
      });
      textEl.css("min-width", `${width - 9 + 0.8}px`);
      textEl.css("min-height", `${height - 3 + 0.8}px`);
      const sOffset = { left: 0 };
      sOffset[suggestPosition] = height;
      suggest.setOffset(sOffset);
      suggest.hide();
      formula.renderCells();
    }
  };

  const setCell = (cellText, cell, validator) => {
    if (cell && cell.editable === false) return;

    _cell = cell;
    initialCell = { ...cell };
    initialText = cellText;

    setText(cellText);

    const format = getFormatFromCell(_cell, getData().getData().styles);

    setTimeout(() => {
      setCaretPosition(
        textEl.el,
        getCaretPositionIndex(textEl.el.textContent, format),
      );
    });

    _validator = validator;
    if (_validator) {
      const { type } = _validator;
      if (type === "date") {
        datepicker.show();
        if (!/^\s*$/.test(cellText)) {
          datepicker.setValue(cellText);
        }
      }
      if (type === "list") {
        suggest.setItems(_validator.values());
        suggest.search("");
      }
    }
  };

  const setText = (text) => {
    const format = getFormatFromCell(_cell, getData().getData().styles);
    inputText = setTextFormat(text, format, getOptions().formats, "start");

    eventEmitter.emit(spreadsheetEvents[eventType].setText, inputText, format);

    // firefox bug
    textEl.el.blur();

    render();
  };

  const formulaCellSelecting = () => {
    return Boolean(formula.cell);
  };

  const formulaSelectCell = (ri, ci) => {
    formula.selectCell(ri, ci);
  };

  const formulaSelectCellRange = (ri, ci) => {
    formula.selectCellRange(ri, ci);
  };

  const formula = new Formula(
    textEl,
    getData,
    cellEl,
    getInputText,
    setInputText,
    render,
    eventEmitter,
  );

  return {
    textEl,
    textlineEl,
    suggest,
    datepicker,
    composing,
    areaEl,
    el,
    cellEl,
    areaOffset,
    freeze,
    inputText,
    formula,
    setFreezeLengths,
    setInputText,
    clear,
    setOffset,
    setCell,
    setText,
    render,
    formulaCellSelecting,
    formulaSelectCell,
    formulaSelectCellRange,
  };
};
