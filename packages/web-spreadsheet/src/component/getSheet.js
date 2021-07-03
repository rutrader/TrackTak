import { h } from "./element";
import { bind, mouseMoveUp, bindTouch } from "./event";
import { xtoast } from "./message";
import { cssPrefix } from "../config";
import spreadsheetEvents from "../core/spreadsheetEvents";
import setTextFormat from "../shared/setTextFormat";
import getFormatFromCell from "../shared/getFormatFromCell";
import getTouchElementOffset from "../shared/getTouchElementOffset";

/**
 * @desc throttle fn
 * @param func function
 * @param wait Delay in milliseconds
 */
function throttle(func, wait) {
  let timeout;
  return (...arg) => {
    const that = this;
    const args = arg;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(that, args);
      }, wait);
    }
  };
}

export const getSheet = (
  toolbar,
  rangeSelector,
  clipboard,
  history,
  print,
  builder,
  rootEl,
  table,
  eventEmitter,
  hyperformula,
  getOptions,
  getData,
  getDataProxy,
  getViewWidthHeight,
  overlayerClickCallback,
) => {
  const {
    rowResizer,
    colResizer,
    verticalScrollbar,
    horizontalScrollbar,
    editor,
    modalValidation,
    contextMenu,
    selector,
    sortFilter,
    comment,
    overlayerCEl,
    overlayerEl,
  } = builder();
  let datas = [];

  const getDatas = () => {
    return datas;
  };

  const getDataValues = () => {
    return datas.map((x) => x.getData());
  };

  eventEmitter.on(spreadsheetEvents.bottombar.selectSheet, (index) => {
    const d = datas[index];

    switchData(d);
  });

  eventEmitter.on(spreadsheetEvents.bottombar.updateSheet, (index, value) => {
    datas[index].name = value;
  });

  eventEmitter.on(spreadsheetEvents.bottombar.addSheet, () => {
    addData(getDataProxy);
  });

  eventEmitter.on(
    spreadsheetEvents.bottombar.deleteSheet,
    (oldIndex, nindex) => {
      if (oldIndex >= 0) {
        datas.splice(oldIndex, 1);

        if (nindex >= 0) {
          switchData(datas[nindex]);
        }
      }
    },
  );

  eventEmitter.on(spreadsheetEvents.rowResizer.finished, (cRect, distance) => {
    rowResizerFinished(cRect, distance);
  });

  eventEmitter.on(spreadsheetEvents.colResizer.finished, (cRect, distance) => {
    colResizerFinished(cRect, distance);
  });

  eventEmitter.on(spreadsheetEvents.rowResizer.unhide, (index) => {
    unhideRowsOrCols("row", index);
  });

  eventEmitter.on(spreadsheetEvents.colResizer.unhide, (index) => {
    unhideRowsOrCols("col", index);
  });

  eventEmitter.on(spreadsheetEvents.verticalScrollbar.move, (distance, evt) => {
    verticalScrollbarMove(distance, evt);
  });

  eventEmitter.on(
    spreadsheetEvents.horizontalScrollbar.move,
    (distance, evt) => {
      horizontalScrollbarMove(distance, evt);
    },
  );

  // editor
  eventEmitter.on(spreadsheetEvents.editor.change, (state, itext) => {
    dataSetCellText(itext, state);
  });

  eventEmitter.on(spreadsheetEvents.rightClickMenu.comment, () => {
    showComment();
  });

  eventEmitter.on(spreadsheetEvents.rightClickMenu.copy, () => {
    copy();
  });

  eventEmitter.on(spreadsheetEvents.rightClickMenu.cut, () => {
    cut();
  });

  eventEmitter.on(spreadsheetEvents.rightClickMenu.paste, () => {
    paste("all");
  });

  eventEmitter.on(spreadsheetEvents.rightClickMenu.pasteValue, () => {
    paste("text");
  });

  eventEmitter.on(spreadsheetEvents.rightClickMenu.pasteFormat, () => {
    paste("format");
  });

  eventEmitter.on(spreadsheetEvents.rightClickMenu.hide, () => {
    hideRowsOrCols();
  });

  const handleInsertDeleting = (callback) => () => {
    if (getOptions().mode === "read") return;

    callback();

    clearClipboard();
    sheetReset();
  };

  const deleteCellText = () => {
    handleInsertDeleting(() => getData().deleteCell("text"))();

    const cell = getData().getSelectedCell();
    const { ri, ci } = rangeSelector.getIndexes();
    const cellAddress = {
      row: ri,
      col: ci,
      sheet: getData().getSheetId(),
    };
    const param = {
      cell,
      cellAddress,
    };

    eventEmitter.emit(spreadsheetEvents.sheet.cellEdited, param);
  };

  const deleteCellFormat = () => {
    handleInsertDeleting(() => getData().deleteCell("format"))();
  };

  eventEmitter.on(
    spreadsheetEvents.rightClickMenu.insertRow,
    handleInsertDeleting(() => getData().insert("row")),
  );

  eventEmitter.on(
    spreadsheetEvents.rightClickMenu.deleteRow,
    handleInsertDeleting(() => getData().deleteData("row")),
  );

  eventEmitter.on(
    spreadsheetEvents.rightClickMenu.insertColumn,
    handleInsertDeleting(() => getData().insert("column")),
  );

  eventEmitter.on(
    spreadsheetEvents.rightClickMenu.deleteColumn,
    handleInsertDeleting(() => getData().deleteData("column")),
  );

  eventEmitter.on(
    spreadsheetEvents.rightClickMenu.deleteCellText,
    deleteCellText,
  );

  eventEmitter.on(
    spreadsheetEvents.rightClickMenu.cellPrintable,
    handleInsertDeleting(() =>
      getData().setSelectedCellAttr("printable", true),
    ),
  );

  eventEmitter.on(
    spreadsheetEvents.rightClickMenu.cellNonPrintable,
    handleInsertDeleting(() =>
      getData().setSelectedCellAttr("printable", false),
    ),
  );

  eventEmitter.on(
    spreadsheetEvents.rightClickMenu.cellEditable,
    handleInsertDeleting(() => getData().setSelectedCellAttr("editable", true)),
  );

  eventEmitter.on(
    spreadsheetEvents.rightClickMenu.cellNonEditable,
    handleInsertDeleting(() =>
      getData().setSelectedCellAttr("editable", false),
    ),
  );

  eventEmitter.on(spreadsheetEvents.sheet.mouseMoveUp, () => {
    toolbarChangePaintformatPaste();
  });

  Object.values(spreadsheetEvents.toolbar).forEach((key) => {
    eventEmitter.on(key, (type, value) => toolbarChange(type, value));
  });

  const toolbarChangePaintformatPaste = () => {
    if (toolbar.paintformatActive()) {
      paste("format");
      clearClipboard();
      toolbar.paintformatToggle();
    }
  };

  function toolbarChange(type, value) {
    if (type === "undo") {
      undo();
    } else if (type === "redo") {
      redo();
    } else if (type === "print") {
      print.preview();
    } else if (type === "paintformat") {
      if (value === true) {
        copy();
      } else {
        clearClipboard();
      }
    } else if (type === "clearformat") {
      deleteCellFormat("delete-cell-format");
    } else if (type === "link") {
      // link
    } else if (type === "chart") {
      // chart
    } else if (type === "autofilter") {
      // filter
      autofilter();
    } else if (type === "freeze") {
      if (value) {
        const { ri, ci } = rangeSelector.getIndexes();
        freeze(ri, ci);
      } else {
        freeze(0, 0);
      }
    } else {
      getData().setSelectedCellAttr(type, value);
      if (type === "formula" && !rangeSelector.range.multiple()) {
        editorSet();
      }
      sheetReset();
    }
  }

  // Can't use datas length because user could
  // delete in between sheets
  let totalDatasAdded = 0;

  const makeSetDatasheets = (getDataProxy) => (dataSheets) => {
    datas = [];

    const addDataProxy = (name) => {
      totalDatasAdded += 1;

      const data = getDataProxy(name);

      datas.push(data);

      if (hyperformula.isItPossibleToAddSheet(name)) {
        hyperformula.addSheet(name);

        switchData(datas[0]);
      }

      return data;
    };

    if (!dataSheets.length) {
      // Add dummy data for now until dataProxy is refactored
      addDataProxy("sheet1");
    }

    dataSheets.forEach((dataSheet) => {
      let data;

      data = addDataProxy(dataSheet.name);
      data.setData(dataSheet);
    });

    // Some sheets have to be added before others for hyperformula
    // if they are depended on. Can also use rebuildAndRecalculate()
    // but that has a performance hit.
    dataSheets
      .sort((x) => x.calculationOrder)
      .forEach((dataSheet) => {
        const sheetId = hyperformula.getSheetId(dataSheet.name);

        hyperformula.setSheetContent(sheetId, dataSheet.serializedValues);

        if (getOptions().debugMode) {
          console.log(
            `registered sheet content: ${dataSheet.name} (sheet id: ${sheetId})`,
            hyperformula.getSheetFormulas(sheetId),
          );
        }
      });

    eventEmitter.emit(spreadsheetEvents.sheet.setDatasheets, dataSheets);

    sheetReset();
  };

  const addData = (getDataProxy, name) => {
    totalDatasAdded += 1;

    const newName = name ?? `sheet${totalDatasAdded}`;

    const data = getDataProxy(newName);

    if (hyperformula.isItPossibleToAddSheet(newName)) {
      hyperformula.addSheet(newName);
    }

    datas.push(data);

    switchData(data);

    eventEmitter.emit(spreadsheetEvents.sheet.addData, newName, data);
  };

  const switchData = (newData) => {
    eventEmitter.emit(spreadsheetEvents.sheet.switchData, newData);

    sheetReset();
  };

  // freeze rows or cols
  const freeze = (ri, ci) => {
    getData().setFreeze(ri, ci);
    sheetReset();
  };

  const undo = () => {
    hyperformula.undo();
    history.undo();
    toolbar.reset();
  };

  const redo = () => {
    hyperformula.redo();
    history.redo();
    toolbar.reset();
  };

  const reload = () => {
    sheetReset();
  };

  const el = h("div", `${cssPrefix}-sheet`);

  let focusing;
  let lastFocused;

  const getLastFocused = () => lastFocused;

  const setLastFocused = (focused) => {
    lastFocused = focused;
  };

  el.children(
    table.el,
    overlayerEl.el,
    rowResizer.el,
    colResizer.el,
    verticalScrollbar.el,
    horizontalScrollbar.el,
    contextMenu.el,
    modalValidation.el,
    sortFilter.el,
    comment.el,
  );
  sheetInitEvents();

  rootEl.child(el);

  function scrollbarMove() {
    const { l, t, left, top, width, height } = getData().getSelectedRect();
    const tableOffset = table.getOffset();
    // console.log(',l:', l, ', left:', left, ', tOffset.left:', tableOffset.width);
    if (Math.abs(left) + width > tableOffset.width) {
      horizontalScrollbar.move({ left: l + width - tableOffset.width });
    } else {
      const fsw = getData().freezeTotalWidth();
      if (left < fsw) {
        horizontalScrollbar.move({ left: l - 1 - fsw });
      }
    }
    // console.log('top:', top, ', height:', height, ', tof.height:', tableOffset.height);
    if (Math.abs(top) + height > tableOffset.height) {
      verticalScrollbar.move({ top: t + height - tableOffset.height - 1 });
    } else {
      const fsh = getData().freezeTotalHeight();
      if (top < fsh) {
        verticalScrollbar.move({ top: t - 1 - fsh });
      }
    }
  }

  function selectorSet(
    multiple,
    ri,
    ci,
    indexesUpdated = true,
    moving = false,
  ) {
    if (ri === -1 && ci === -1) return;
    contextMenu.setMode(ri === -1 || ci === -1 ? "row-col" : "range");
    const cell = getData().getCell(ri, ci);
    if (multiple) {
      selector.setEnd(ri, ci, moving);
      eventEmitter.emit(
        spreadsheetEvents.sheet.cellsSelected,
        cell,
        selector.range,
      );
    } else {
      // Blur the content editable to fix safari bug
      editor.textEl.el.blur();
      selector.set(ri, ci, indexesUpdated);

      editorSetOffset();

      const cellText = hyperformula.getCellSerialized({
        row: ri,
        col: ci,
        sheet: getData().getSheetId(),
      });

      eventEmitter.emit(
        spreadsheetEvents.sheet.cellSelected,
        cell,
        cellText,
        ri,
        ci,
      );
    }
  }

  // multiple: boolean
  // direction: left | right | up | down | row-first | row-last | col-first | col-last
  function selectorMove(multiple, direction) {
    const { rows, cols } = getData();
    let [ri, ci] = selector.indexes;
    const { eri, eci } = selector.range;
    if (multiple) {
      [ri, ci] = selector.moveIndexes;
    }
    // console.log('selector.move:', ri, ci);
    if (direction === "left") {
      if (ci > 0) ci -= 1;
    } else if (direction === "right") {
      if (eci !== ci) ci = eci;
      if (ci < cols.len - 1) ci += 1;
    } else if (direction === "up") {
      if (ri > 0) ri -= 1;
    } else if (direction === "down") {
      if (eri !== ri) ri = eri;
      if (ri < rows.len - 1) ri += 1;
    } else if (direction === "row-first") {
      ci = 0;
    } else if (direction === "row-last") {
      ci = cols.len - 1;
    } else if (direction === "col-first") {
      ri = 0;
    } else if (direction === "col-last") {
      ri = rows.len - 1;
    }
    if (multiple) {
      selector.moveIndexes = [ri, ci];
    }
    selectorSet(multiple, ri, ci);
    scrollbarMove();
  }

  // private methods
  function overlayerMousemove(evt) {
    // console.log('x:', evt.offsetX, ', y:', evt.offsetY);
    if (evt.buttons !== 0) return;
    if (evt.target.className === `${cssPrefix}-resizer-hover`) return;
    const { offsetX, offsetY } = evt;

    const { rows, cols } = getData();
    if (offsetX > cols.indexWidth && offsetY > rows.indexHeight) {
      rowResizer.hide();
      colResizer.hide();
      return;
    }
    const tRect = table.el.box();
    const cRect = getData().getCellRectByXY(evt.offsetX, evt.offsetY);
    if (cRect.ri >= 0 && cRect.ci === -1) {
      cRect.width = cols.indexWidth;
      rowResizer.show(cRect, {
        width: tRect.width,
      });
      if (rows.isHide(cRect.ri - 1)) {
        rowResizer.showUnhide(cRect.ri);
      } else {
        rowResizer.hideUnhide();
      }
    } else {
      rowResizer.hide();
    }
    if (cRect.ri === -1 && cRect.ci >= 0) {
      cRect.height = rows.indexHeight;
      colResizer.show(cRect, {
        height: tRect.height,
      });
      if (cols.isHide(cRect.ci - 1)) {
        colResizer.showUnhide(cRect.ci);
      } else {
        colResizer.hideUnhide();
      }
    } else {
      colResizer.hide();
    }
  }

  function overlayerMousescroll(evt) {
    // deltaY for vertical delta
    const { deltaY, deltaX } = evt;

    const { top } = verticalScrollbar.scroll();
    const { left } = horizontalScrollbar.scroll();
    const { rows, cols } = getData();
    const ri = getData().scroll.ri + 1;
    const mwheelScrollSpeed = getOptions().mwheelScrollSpeed;
    const scrollEl = verticalScrollbar.el.el;
    // https://stackoverflow.com/questions/876115/how-can-i-determine-if-a-div-is-scrolled-to-the-bottom
    const isAtBottom =
      Math.ceil(scrollEl.scrollHeight - scrollEl.scrollTop) ===
      scrollEl.clientHeight;
    const isAtTop = scrollEl.scrollTop === 0;

    const isMouseWheelUp = deltaY < 0;

    if ((isAtTop && isMouseWheelUp) || (isAtBottom && !isMouseWheelUp)) {
    } else {
      evt.preventDefault();
    }

    const loopValue = (ii, vFunc) => {
      let i = ii;
      let v = 0;
      do {
        v = vFunc(i);
        i += 1;
      } while (v <= 0);
      return v;
    };

    const moveY = () => {
      if (isMouseWheelUp) {
        const newRi = ri - 1;

        if (!isAtTop) {
          const rh =
            loopValue(newRi, (i) => rows.getHeight(i)) * mwheelScrollSpeed;
          verticalScrollbar.move({ top: newRi === 0 ? 0 : top - rh });
        }
      } else {
        const newRi = ri + 1;

        if (!isAtBottom) {
          const rh =
            loopValue(newRi, (i) => rows.getHeight(i)) * mwheelScrollSpeed;
          verticalScrollbar.move({ top: top + rh - 1 });
        }
      }
    };

    // deltaX for Mac horizontal scroll
    const moveX = (horizontal) => {
      if (horizontal > 0) {
        const ci = getData().scroll.ci + 1;
        if (ci < cols.len) {
          const cw = loopValue(ci, (i) => cols.getWidth(i)) * mwheelScrollSpeed;
          horizontalScrollbar.move({ left: left + cw - 1 });
        }
      } else {
        const ci = getData().scroll.ci - 1;
        if (ci >= 0) {
          const cw = loopValue(ci, (i) => cols.getWidth(i)) * mwheelScrollSpeed;
          horizontalScrollbar.move({ left: ci === 0 ? 0 : left - cw });
        }
      }
    };
    const tempY = Math.abs(deltaY);
    const tempX = Math.abs(deltaX);
    const temp = Math.max(tempY, tempX);

    if (temp === tempX) throttle(moveX(deltaX), 50);
    if (temp === tempY) throttle(moveY(deltaY), 50);
  }

  function overlayerTouch(direction, distance) {
    const { top } = verticalScrollbar.scroll();
    const { left } = horizontalScrollbar.scroll();

    if (direction === "left" || direction === "right") {
      horizontalScrollbar.move({ left: left - distance });
    } else if (direction === "up" || direction === "down") {
      verticalScrollbar.move({ top: top - distance });
    }
  }

  function verticalScrollbarSet() {
    const { height } = table.getOffset();
    const erth = getData().exceptRowTotalHeight(0, -1);
    // console.log('erth:', erth);
    verticalScrollbar.set(height, getData().rows.totalHeight() - erth);
  }

  function horizontalScrollbarSet() {
    const { width } = table.getOffset();
    if (getData()) {
      horizontalScrollbar.set(width, getData().cols.totalWidth());
    }
  }

  function sheetFreeze() {
    const [ri, ci] = getData().getFreeze();
    if (ri > 0 || ci > 0) {
      const fwidth = getData().freezeTotalWidth();
      const fheight = getData().freezeTotalHeight();
      editor.setFreezeLengths(fwidth, fheight);
    }
    selector.resetAreaOffset();
  }

  const render = () => {
    const tOffset = table.getOffset();
    const vRect = getViewWidthHeight();
    table.el.attr(vRect);
    overlayerEl.offset(vRect);
    overlayerCEl.offset(tOffset);
    el.css("width", `${vRect.width}px`);
    verticalScrollbarSet();
    horizontalScrollbarSet();
    sheetFreeze();
    table.render();
  };

  function sheetReset() {
    render();
    eventEmitter.emit(spreadsheetEvents.sheet.sheetReset);
    selector.reset();
  }

  function clearClipboard() {
    getData().clearClipboard();
    selector.hideClipboard();
  }

  const showComment = () => {
    comment.show();
  };

  function copy() {
    getData().copy();
    selector.showClipboard();
  }

  function cut() {
    getData().cut();
    selector.showClipboard();
  }

  async function paste(what, evt) {
    if (getOptions().mode === "read") return;
    if (clipboard.isClear()) {
      await getData().pasteFromSystemClipboard();

      sheetReset();
    } else if (getData().paste(what, (msg) => xtoast("Tip", msg))) {
      sheetReset();
    } else if (evt) {
      const cdata = evt.clipboardData.getData("text/plain");
      getData().pasteFromText(cdata);
      sheetReset();
    }
  }

  function hideRowsOrCols() {
    getData().hideRowsOrCols();
    sheetReset();
  }

  function unhideRowsOrCols(type, index) {
    getData().unhideRowsOrCols(type, index);
    sheetReset();
  }

  function autofilter() {
    getData().changeAutofilter();
    sheetReset();
  }

  const mouseDownOverlayerCellOffset = (evt) => {
    const { offsetX, offsetY } = evt;
    const isAutofillEl = getIsAutofillEl(evt.target.className);

    let { ri, ci } = setOverlayerCellOffset(offsetX, offsetY);

    if (!evt.shiftKey) {
      if (isAutofillEl) {
        selector.showAutofill(ri, ci);
      } else {
        selectorSet(false, ri, ci);
      }

      // mouse move up
      mouseMoveUp(
        window,
        (e) => {
          ({ ri, ci } = getData().getCellRectByXY(e.offsetX, e.offsetY));
          if (isAutofillEl) {
            selector.showAutofill(ri, ci);
          } else if (e.buttons === 1 && !e.shiftKey) {
            selectorSet(true, ri, ci, true, true);
          }
        },
        () => {
          if (isAutofillEl && selector.arange && getOptions().mode !== "read") {
            if (
              getData().autofill(selector.arange, "all", (msg) =>
                xtoast("Tip", msg),
              )
            ) {
              table.render();
            }
          }
          selector.hideAutofill();
          eventEmitter.emit(spreadsheetEvents.sheet.mouseMoveUp);
        },
      );
    }

    if (!isAutofillEl && evt.buttons === 1) {
      if (evt.shiftKey) {
        selectorSet(true, ri, ci);
      }
    }
  };

  const getIsAutofillEl = (targetClassName) => {
    return targetClassName === `${cssPrefix}-selector-corner`;
  };

  const touchStartOverlayer = (evt) => {
    const { offsetX, offsetY } = getTouchElementOffset(evt);
    const { ri, ci } = setOverlayerCellOffset(offsetX, offsetY);
    const isAutofillEl = getIsAutofillEl(evt.target.className);

    if (isAutofillEl) {
      selector.showAutofill(ri, ci);
    } else {
      selectorSet(false, ri, ci);
    }
  };

  const setOverlayerCellOffset = (offsetX, offsetY) => {
    const cellRect = getData().getCellRectByXY(offsetX, offsetY);
    const { left, top, width, height } = cellRect;
    let { ri, ci } = cellRect;
    // sort or filter
    const { autoFilter } = getData();
    if (autoFilter.includes(ri, ci)) {
      if (left + width - 20 < offsetX && top + height - 20 < offsetY) {
        const items = autoFilter.items(ci, (r, c) =>
          getData().rows.getCell(r, c),
        );
        sortFilter.hide();
        sortFilter.set(
          ci,
          items,
          autoFilter.getFilter(ci),
          autoFilter.getSort(ci),
        );
        sortFilter.setOffset({ left, top: top + height + 2 });
        return;
      }
    }

    return {
      ri,
      ci,
    };
  };

  function editorSetOffset() {
    const sOffset = getData().getSelectedRect();
    const tOffset = table.getOffset();
    let sPosition = "top";

    if (sOffset.top > tOffset.height / 2) {
      sPosition = "bottom";
    }
    editor.setOffset(sOffset, sPosition);
  }

  function editorSet(cellText) {
    if (getOptions().mode === "read") return;

    const indexes = rangeSelector.getIndexes();

    const value = hyperformula.getCellSerialized({
      row: indexes.ri,
      col: indexes.ci,
      sheet: getData().getSheetId(),
    });

    editor.setCell(
      cellText ?? value?.toString(),
      getData().getSelectedCell(),
      getData().getSelectedValidator(),
    );
    clearClipboard();
  }

  function verticalScrollbarMove(distance) {
    getData().scrolly(distance, () => {
      selector.resetBRLAreaOffset();
      editorSetOffset();
      table.render();
    });
  }

  function horizontalScrollbarMove(distance) {
    getData().scrollx(distance, () => {
      selector.resetBRTAreaOffset();
      editorSetOffset();
      table.render();
    });
  }

  function rowResizerFinished(cRect, distance) {
    const { ri } = cRect;
    getData().rows.setHeight(ri, distance);
    table.render();
    selector.resetAreaOffset();
    verticalScrollbarSet();
    editorSetOffset();
  }

  function colResizerFinished(cRect, distance) {
    const { ci } = cRect;
    getData().cols.setWidth(ci, distance);

    table.render();
    selector.resetAreaOffset();
    horizontalScrollbarSet();
    editorSetOffset();
  }

  function dataSetCellText(text, state = "finished") {
    if (getOptions().mode === "read") return;
    const cell = getData().getSelectedCell();
    const styles = getData().getData().styles;
    const format = getFormatFromCell(text, cell, styles);

    let newText = setTextFormat(text, format, getOptions().formats, state);
    getData().setSelectedCellText(newText, state);

    const { ri, ci } = rangeSelector.getIndexes();
    const cellAddress = {
      row: ri,
      col: ci,
      sheet: getData().getSheetId(),
    };

    const param = {
      cell,
      cellAddress,
      format,
      value: newText,
    };

    if (state === "finished") {
      table.render();
      eventEmitter.emit(spreadsheetEvents.sheet.cellEdited, param);
    } else {
      eventEmitter.emit(spreadsheetEvents.sheet.cellEdit, param);
    }

    return newText;
  }

  function sortFilterChange(ci, order, operator, value) {
    getData().setAutoFilter(ci, order, operator, value);
    sheetReset();
  }

  function sheetInitEvents() {
    // Check if we are in chrome mobile simulation mode
    let getIsInTouchMode = () => {
      return (
        getOptions().debugMode &&
        window.navigator.userAgent.indexOf("Mobile") !== -1
      );
    };

    // overlayer
    overlayerEl
      .on("mousemove", (evt) => {
        if (getIsInTouchMode()) return;

        overlayerMousemove(evt);
      })
      .on("mousedown", (evt) => {
        if (getIsInTouchMode()) return;

        overlayerClickCallback();
        lastFocused = true;

        // If a formula cell is being edited and a left click is made,
        // set that formula cell to start at the selected sheet cell and set a
        // temporary mousemove event handler that updates said formula cell to
        // end at the sheet cell currently being hovered over.
        if (
          evt.buttons === 1 &&
          evt.detail <= 1 &&
          editor.formulaCellSelecting()
        ) {
          const { offsetX, offsetY } = evt;
          const { ri, ci } = getData().getCellRectByXY(offsetX, offsetY);
          editor.formulaSelectCell(ri, ci);

          let lastCellRect = { ri: null, ci: null };
          mouseMoveUp(
            window,
            (e) => {
              const cellRect = getData().getCellRectByXY(e.offsetX, e.offsetY);

              const hasRangeChanged =
                cellRect.ri != lastCellRect.ri ||
                cellRect.ci != lastCellRect.ci;
              const isRangeValid = cellRect.ri >= 0 && cellRect.ci >= 0;

              if (hasRangeChanged && isRangeValid) {
                editor.formulaSelectCellRange(cellRect.ri, cellRect.ci);

                lastCellRect.ri = cellRect.ri;
                lastCellRect.ci = cellRect.ci;
              }
            },
            () => {},
          );

          return;
        }

        editor.clear();

        contextMenu.hide();
        // the left mouse button: mousedown → mouseup → click
        // the right mouse button: mousedown → contenxtmenu → mouseup
        if (evt.buttons === 2) {
          if (getData().xyInSelectedRect(evt.offsetX, evt.offsetY)) {
            contextMenu.setPosition(evt.offsetX, evt.offsetY);
          } else {
            mouseDownOverlayerCellOffset(evt);
            contextMenu.setPosition(evt.offsetX, evt.offsetY);
          }
          evt.stopPropagation();
        } else if (evt.detail === 2) {
          editorSet();
        } else {
          mouseDownOverlayerCellOffset(evt);
        }
      })
      .on("wheel.stop", (evt) => {
        if (getIsInTouchMode()) return;

        overlayerMousescroll(evt);
      })
      .on("mouseout", (evt) => {
        if (getIsInTouchMode()) return;

        const { offsetX, offsetY } = evt;
        if (offsetY <= 0) colResizer.hide();
        if (offsetX <= 0) rowResizer.hide();
      });

    // slide on mobile
    bindTouch(overlayerEl.el, {
      move: (direction, d) => {
        overlayerTouch(direction, d);
      },
      touchstart: (evt) => {
        overlayerClickCallback();

        lastFocused = true;

        editor.clear();
        contextMenu.hide();

        touchStartOverlayer(evt);
        editorSet();
      },
    });

    const clickWindow = (evt) => {
      focusing = overlayerEl.contains(evt.target);

      if (!focusing) {
        editor.clear();

        eventEmitter.emit(spreadsheetEvents.sheet.clickOutside, evt);
      }
    };

    bindTouch(window, {
      touchstart: (evt) => {
        clickWindow(evt);
      },
    });

    // sort filter ok
    sortFilter.ok = (ci, order, o, v) => sortFilterChange(ci, order, o, v);

    // modal validation
    modalValidation.change = (action, ...args) => {
      if (action === "save") {
        getData().addValidation(...args);
      } else {
        getData().removeValidation();
      }
    };

    bind(window, "resize", () => {
      reload();
    });

    bind(window, "mousedown", (evt) => {
      if (getIsInTouchMode()) return;

      clickWindow(evt);
    });

    // for selector
    bind(window, "keydown", (evt) => {
      if (!focusing) return;
      const keyCode = evt.keyCode || evt.which;
      const { key, ctrlKey, shiftKey, metaKey } = evt;
      // console.log('keydown.evt: ', keyCode);
      if (ctrlKey || metaKey) {
        // const { sIndexes, eIndexes } = selector;
        // let what = 'all';
        // if (shiftKey) what = 'text';
        // if (altKey) what = 'format';
        switch (keyCode) {
          case 90:
            // undo: ctrl + z
            undo();
            evt.preventDefault();
            break;
          case 89:
            // redo: ctrl + y
            redo();
            evt.preventDefault();
            break;
          case 67:
            // ctrl + c
            copy();
            evt.preventDefault();
            break;
          case 77:
            // ctrl + alt + m
            showComment();
            evt.preventDefault();
            break;
          case 88:
            // ctrl + x
            cut();
            evt.preventDefault();
            break;
          case 86:
            // ctrl + v
            // => paste
            // evt.preventDefault();
            break;
          case 37:
            // ctrl + left
            selectorMove(shiftKey, "row-first");
            evt.preventDefault();
            break;
          case 38:
            // ctrl + up
            selectorMove(shiftKey, "col-first");
            evt.preventDefault();
            break;
          case 39:
            // ctrl + right
            selectorMove(shiftKey, "row-last");
            evt.preventDefault();
            break;
          case 40:
            // ctrl + down
            selectorMove(shiftKey, "col-last");
            evt.preventDefault();
            break;
          case 32:
            // ctrl + space, all cells in col
            selectorSet(false, -1, rangeSelector.getIndexes().ci, false);
            evt.preventDefault();
            break;
          default:
            break;
        }
        eventEmitter.emit(spreadsheetEvents.sheet.ctrlKeyDown, evt, keyCode);
      } else {
        // console.log('evt.keyCode:', evt.keyCode);
        switch (keyCode) {
          case 32:
            if (shiftKey) {
              // shift + space, all cells in row
              selectorSet(false, rangeSelector.getIndexes().ri, -1, false);
            }
            break;
          case 27: // esc
            contextMenu.hide();
            clearClipboard();
            break;
          case 37: // left
            selectorMove(shiftKey, "left");
            evt.preventDefault();
            break;
          case 38: // up
            selectorMove(shiftKey, "up");
            evt.preventDefault();
            break;
          case 39: // right
            selectorMove(shiftKey, "right");
            evt.preventDefault();
            break;
          case 40: // down
            selectorMove(shiftKey, "down");
            evt.preventDefault();
            break;
          case 9: // tab
            editor.clear();
            // shift + tab => move left
            // tab => move right
            selectorMove(false, shiftKey ? "left" : "right");
            evt.preventDefault();
            break;
          case 13: // enter
            editor.clear();
            // shift + enter => move up
            // enter => move down
            selectorMove(false, shiftKey ? "up" : "down");
            evt.preventDefault();
            break;
          case 8: // backspace
            deleteCellText();
            evt.preventDefault();
            break;
          default:
            break;
        }

        if (key === "Delete") {
          deleteCellText();
          evt.preventDefault();
        } else if (
          (keyCode >= 65 && keyCode <= 90) ||
          (keyCode >= 48 && keyCode <= 57) ||
          (keyCode >= 96 && keyCode <= 105) ||
          evt.key === "=" ||
          evt.key === "." ||
          evt.key === "-"
        ) {
          const cellText = dataSetCellText(evt.key, "startInput");

          editorSet(cellText);
        } else if (keyCode === 113) {
          // F2
          editorSet();
        }
      }
    });
  }

  return {
    sheet: {
      el,
      makeSetDatasheets,
      addData,
      getDatas,
      switchData,
      freeze,
      undo,
      redo,
      reload,
      copy,
      clearClipboard,
      paste,
      autofilter,
      overlayerEl,
      editorSet,
      sheetReset,
      table,
      getOptions,
      getData,
      rootEl,
      hyperformula,
      eventEmitter,
      render,
      deleteCellFormat,
      getDataValues,
      getLastFocused,
      setLastFocused,
      lastFocused,
      selector,
    },
  };
};
