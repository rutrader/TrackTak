import { h } from "./element";
import { bind, mouseMoveUp, bindTouch } from "./event";
import { xtoast } from "./message";
import { cssPrefix } from "../config";
import spreadsheetEvents from "../core/spreadsheetEvents";
import { makeGetViewWidthHeight } from "./makeGetViewWidthHeight";
import { getResizer } from "./getResizer";
import { getScrollbar } from "./getScrollbar";
import { getEditor } from "./editor/getEditor";
import ModalValidation from "./modal_validation";
import { getContextMenu } from "./contextmenu";
import Selector from "./selector";
import SortFilter from "./sort_filter";
import { getFormulaSuggestions } from "../shared/getFormulaSuggestions";

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

export const buildSheet = (getOptions, getData, eventEmitter) => {
  const rowResizer = getResizer(
    eventEmitter,
    spreadsheetEvents.rowResizer,
    () => getOptions().row.height,
  );
  const colResizer = getResizer(
    eventEmitter,
    spreadsheetEvents.colResizer,
    () => getOptions().col.minWidth,
    true,
  );
  const verticalScrollbar = getScrollbar(eventEmitter, true);
  const horizontalScrollbar = getScrollbar(eventEmitter, false);
  const editor = getEditor(getData, getFormulaSuggestions(), eventEmitter);
  const modalValidation = new ModalValidation();
  const getViewWidthHeight = makeGetViewWidthHeight(getOptions);
  const contextMenu = getContextMenu(
    getViewWidthHeight,
    eventEmitter,
    () => !getOptions().showContextMenu,
  );
  const selector = new Selector(eventEmitter, getData);
  const sortFilter = new SortFilter();

  return () => ({
    rowResizer,
    colResizer,
    verticalScrollbar,
    horizontalScrollbar,
    editor,
    modalValidation,
    contextMenu,
    selector,
    sortFilter,
  });
};

export const getSheet = (
  builder,
  rootEl,
  table,
  eventEmitter,
  hyperformula,
  getOptions,
  getData,
  isVariablesSpreadsheet,
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
  } = builder();
  let datas = [];

  eventEmitter.on(spreadsheetEvents.bottombar.selectSheet, (index) => {
    const d = datas[index];

    switchData(d);
  });

  eventEmitter.on(spreadsheetEvents.bottombar.updateSheet, (index, value) => {
    datas[index].name = value;
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

  const makeSetDatasheets = (getDataProxy) => (dataSheets) => {
    datas = [];

    eventEmitter.emit(spreadsheetEvents.sheet.setDatasheets);

    dataSheets.forEach((dataSheet, i) => {
      const data = addData(getDataProxy, dataSheet.name, i === 0);

      if (hyperformula.isItPossibleToAddSheet(dataSheet.name)) {
        hyperformula.addSheet(dataSheet.name);
      }

      data.setData(dataSheet);
    });

    if (!dataSheets.length) {
      // Add dummy data for now until dataProxy is refactored
      addData(getDataProxy);
    }

    switchData(datas[0]);
    sheetReset();
    selectorSet(false, 0, 0);
  };

  const addData = (
    getDataProxy,
    name = `sheet${datas.length + 1}`,
    active = true,
  ) => {
    const data = getDataProxy(name);

    datas.push(data);

    eventEmitter.emit(spreadsheetEvents.sheet.addData, name, active);

    return data;
  };

  const switchData = (newData) => {
    eventEmitter.emit(spreadsheetEvents.sheet.switchData, newData);

    verticalScrollbarSet();
    horizontalScrollbarSet();
  };

  // freeze rows or cols
  const freeze = (ri, ci) => {
    getData().setFreeze(ri, ci);
    sheetReset();
  };

  const undo = () => {
    getData().undo();
    sheetReset();
  };

  const redo = () => {
    getData().redo();
    sheetReset();
  };

  const reload = () => {
    sheetReset();
  };

  const el = h("div", `${cssPrefix}-sheet`);

  let focusing;

  const overlayerCEl = h("div", `${cssPrefix}-overlayer-content`).children(
    editor.el,
    selector.el,
    editor.cellEl,
  );
  const overlayerEl = h("div", `${cssPrefix}-overlayer`).child(overlayerCEl);

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
      selector.set(ri, ci, indexesUpdated);
      eventEmitter.emit(spreadsheetEvents.sheet.cellSelected, cell, ri, ci);
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
    // TODO: Fix for upper/lower bounds scroll
    // evt.preventDefault();

    const { top } = verticalScrollbar.scroll();
    const { left } = horizontalScrollbar.scroll();
    // console.log('evt:::', evt.wheelDelta, evt.detail * 40);

    const { rows, cols } = getData();

    // deltaY for vertical delta
    const { deltaY, deltaX } = evt;
    const loopValue = (ii, vFunc) => {
      let i = ii;
      let v = 0;
      do {
        v = vFunc(i);
        i += 1;
      } while (v <= 0);
      return v;
    };
    // console.log('deltaX', deltaX, 'evt.detail', evt.detail);
    // if (evt.detail) deltaY = evt.detail * 40;
    const moveY = (vertical) => {
      if (vertical > 0) {
        // up
        const ri = getData().scroll.ri + 1;
        if (ri < rows.len) {
          const rh = loopValue(ri, (i) => rows.getHeight(i));
          verticalScrollbar.move({ top: top + rh - 1 });
        }
      } else {
        // down
        const ri = getData().scroll.ri - 1;
        if (ri >= 0) {
          const rh = loopValue(ri, (i) => rows.getHeight(i));
          verticalScrollbar.move({ top: ri === 0 ? 0 : top - rh });
        }
      }
    };

    // deltaX for Mac horizontal scroll
    const moveX = (horizontal) => {
      if (horizontal > 0) {
        // left
        const ci = getData().scroll.ci + 1;
        if (ci < cols.len) {
          const cw = loopValue(ci, (i) => cols.getWidth(i));
          horizontalScrollbar.move({ left: left + cw - 1 });
        }
      } else {
        // right
        const ci = getData().scroll.ci - 1;
        if (ci >= 0) {
          const cw = loopValue(ci, (i) => cols.getWidth(i));
          horizontalScrollbar.move({ left: ci === 0 ? 0 : left - cw });
        }
      }
    };
    const tempY = Math.abs(deltaY);
    const tempX = Math.abs(deltaX);
    const temp = Math.max(tempY, tempX);
    // console.log('event:', evt);
    // detail for windows/mac firefox vertical scroll
    if (/Firefox/i.test(window.navigator.userAgent))
      throttle(moveY(evt.detail), 50);
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

  function sheetReset() {
    const getViewWidthHeight = makeGetViewWidthHeight(
      getOptions,
      isVariablesSpreadsheet,
    );
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
    eventEmitter.emit(spreadsheetEvents.sheet.sheetReset);
    selector.reset();
  }

  function clearClipboard() {
    getData().clearClipboard();
    selector.hideClipboard();
  }

  function copy() {
    getData().copy();
    selector.showClipboard();
  }

  function cut() {
    getData().cut();
    selector.showClipboard();
  }

  function paste(what, evt) {
    if (getOptions().mode === "read") return;
    if (getData().paste(what, (msg) => xtoast("Tip", msg))) {
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

  function overlayerMousedown(evt) {
    const { offsetX, offsetY } = evt;
    const isAutofillEl =
      evt.target.className === `${cssPrefix}-selector-corner`;
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
  }

  function editorSetOffset() {
    const sOffset = getData().getSelectedRect();
    const tOffset = table.getOffset();
    let sPosition = "top";
    // console.log('sOffset:', sOffset, ':', tOffset);
    if (sOffset.top > tOffset.height / 2) {
      sPosition = "bottom";
    }
    editor.setOffset(sOffset, sPosition);
  }

  function editorSet() {
    if (getOptions().mode === "read") return;

    editorSetOffset();
    editor.setCell(
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
    getData().setSelectedCellText(text, state);
    const { ri, ci } = getData().selector;
    if (state === "finished") {
      eventEmitter.emit(
        spreadsheetEvents.sheet.cellEditedFinished,
        text,
        ri,
        ci,
      );
    } else {
      eventEmitter.emit(spreadsheetEvents.sheet.cellEdited, text, ri, ci);
      table.render();
    }
  }

  function insertDeleteRowColumn(type) {
    if (getOptions().mode === "read") return;
    if (type === "insert-row") {
      getData().insert("row");
    } else if (type === "delete-row") {
      getData().deleteData("row");
    } else if (type === "insert-column") {
      getData().insert("column");
    } else if (type === "delete-column") {
      getData().deleteData("column");
    } else if (type === "delete-cell") {
      getData().deleteCell();
    } else if (type === "delete-cell-format") {
      getData().deleteCell("format");
    } else if (type === "delete-cell-text") {
      getData().deleteCell("text");
    } else if (type === "cell-printable") {
      getData().setSelectedCellAttr("printable", true);
    } else if (type === "cell-non-printable") {
      getData().setSelectedCellAttr("printable", false);
    } else if (type === "cell-editable") {
      getData().setSelectedCellAttr("editable", true);
    } else if (type === "cell-non-editable") {
      getData().setSelectedCellAttr("editable", false);
    }
    clearClipboard();
    sheetReset();
  }

  function sortFilterChange(ci, order, operator, value) {
    getData().setAutoFilter(ci, order, operator, value);
    sheetReset();
  }

  function sheetInitEvents() {
    // overlayer
    overlayerEl
      .on("mousemove", (evt) => {
        overlayerMousemove(evt);
      })
      .on("mousedown", (evt) => {
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
            overlayerMousedown(evt);
            contextMenu.setPosition(evt.offsetX, evt.offsetY);
          }
          evt.stopPropagation();
        } else if (evt.detail === 2) {
          editorSet();
        } else {
          overlayerMousedown(evt);
        }
      })
      .on("mousewheel.stop", (evt) => {
        // overlayerMousescroll(evt);
      })
      .on("mouseout", (evt) => {
        const { offsetX, offsetY } = evt;
        if (offsetY <= 0) colResizer.hide();
        if (offsetX <= 0) rowResizer.hide();
      });

    // slide on mobile
    bindTouch(overlayerEl.el, {
      move: (direction, d) => {
        overlayerTouch(direction, d);
      },
    });

    // sort filter ok
    sortFilter.ok = (ci, order, o, v) => sortFilterChange(ci, order, o, v);

    eventEmitter.on(
      spreadsheetEvents.rowResizer.finished,
      (cRect, distance) => {
        rowResizerFinished(cRect, distance);
      },
    );

    eventEmitter.on(
      spreadsheetEvents.colResizer.finished,
      (cRect, distance) => {
        colResizerFinished(cRect, distance);
      },
    );

    eventEmitter.on(spreadsheetEvents.rowResizer.unhide, (index) => {
      unhideRowsOrCols("row", index);
    });

    eventEmitter.on(spreadsheetEvents.colResizer.unhide, (index) => {
      unhideRowsOrCols("col", index);
    });

    eventEmitter.on(
      spreadsheetEvents.verticalScrollbar.move,
      (distance, evt) => {
        verticalScrollbarMove(distance, evt);
      },
    );

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
    // modal validation
    modalValidation.change = (action, ...args) => {
      if (action === "save") {
        getData().addValidation(...args);
      } else {
        getData().removeValidation();
      }
    };

    eventEmitter.on(
      spreadsheetEvents.rightClickMenu.clickContextMenu,
      (type) => {
        if (type === "validation") {
          modalValidation.setValue(getData().getSelectedValidation());
        } else if (type === "copy") {
          copy();
        } else if (type === "cut") {
          cut();
        } else if (type === "paste") {
          paste("all");
        } else if (type === "paste-value") {
          paste("text");
        } else if (type === "paste-format") {
          paste("format");
        } else if (type === "hide") {
          hideRowsOrCols();
        } else {
          insertDeleteRowColumn(type);
        }
      },
    );

    bind(window, "resize", () => {
      reload();
    });

    bind(window, "click", (evt) => {
      focusing = overlayerEl.contains(evt.target);
    });

    bind(window, "paste", (evt) => {
      paste("all", evt);
      evt.preventDefault();
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
            selectorSet(false, -1, getData().selector.ci, false);
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
              selectorSet(false, getData().selector.ri, -1, false);
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
            insertDeleteRowColumn("delete-cell-text");
            evt.preventDefault();
            break;
          default:
            break;
        }

        if (key === "Delete") {
          insertDeleteRowColumn("delete-cell-text");
          evt.preventDefault();
        } else if (
          (keyCode >= 65 && keyCode <= 90) ||
          (keyCode >= 48 && keyCode <= 57) ||
          (keyCode >= 96 && keyCode <= 105) ||
          evt.key === "="
        ) {
          dataSetCellText(evt.key, "input");
          editorSet();
        } else if (keyCode === 113) {
          // F2
          editorSet();
        }
      }
    });
  }

  return {
    el,
    makeSetDatasheets,
    addData,
    switchData,
    freeze,
    undo,
    redo,
    reload,
    copy,
    clearClipboard,
    paste,
    insertDeleteRowColumn,
    autofilter,
    editorSet,
    sheetReset,
    table,
    datas,
    getOptions,
    getData,
    rootEl,
    eventEmitter,
  };
};
