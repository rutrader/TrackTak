import { CellRange } from "./cell_range";
import { expr2xy, xy2expr } from "./alphabet";
import { t } from "../locale/locale";
import helper from "./helper";
import getDefaultFormatFromText from "../shared/getDefaultFormatFromText";
import { isNil } from "lodash-es";

export const makeGetDataProxy = (
  type,
  save,
  rangeSelector,
  clipboard,
  builder,
  hyperformula,
  getOptions,
  eventEmitter,
  getViewWidthHeight,
  history,
) => (name) => {
  let freeze = [0, 0];
  let styles = []; // Array<Style>
  let calculationOrder;

  const { merges, rows, cols, validations, scroll, autoFilter } = builder();

  let exceptRowSet = new Set();
  let sortedRowMap = new Map();
  let unsortedRowMap = new Map();

  const persistDataChange = (callback) => {
    save.persistDataChange(type, name, getData(), callback);
  };

  const addValidation = (mode, ref, validator) => {
    persistDataChange(() => {
      validations.add(mode, ref, validator);
    });
  };

  const removeValidation = () => {
    const { range } = rangeSelector;
    persistDataChange(() => {
      validations.remove(range);
    });
  };

  const getSelectedValidator = () => {
    const { ri, ci } = rangeSelector.getIndexes();
    const v = validations.get(ri, ci);
    return v ? v.validator : null;
  };

  const getSelectedValidation = () => {
    const { range } = rangeSelector;
    const { ri, ci } = rangeSelector.getIndexes();
    const v = validations.get(ri, ci);
    const ret = { ref: range.toString() };
    if (v !== null) {
      ret.mode = v.mode;
      ret.validator = v.validator;
    }
    return ret;
  };

  const copy = () => {
    clipboard.copy(rangeSelector.range);
  };

  const cut = () => {
    clipboard.cut(rangeSelector.range);
  };

  const paste = (copyPasteFunc) => {
    persistDataChange(() => {
      if (clipboard.isCopy()) {
        copyPasteFunc(clipboard.getRange(), rangeSelector.range);
      } else if (clipboard.isCut()) {
        cutPaste(clipboard.getRange(), rangeSelector.range);
      }
    });
  };

  const pasteFromSystemClipboard = () => {
    // TODO: Add html formatting later
    // Google sheets is doing a best guess for layout based on
    // HTML elements such as span, div etc
    // const htmlData = await data[0].getType("text/html");

    return navigator.clipboard.read().then((data) => {
      return data[0].getType("text/plain").then((plainTextBlob) => {
        return plainTextBlob.text().then((plainText) => {
          persistDataChange(() => {
            const content = parseClipboardContent(plainText);
            const { ri, ci } = rangeSelector.getIndexes();

            let startRow = ri;

            content.forEach((row) => {
              let startColumn = ci;

              row.forEach((cellContent) => {
                setCellText(startRow, startColumn, cellContent, "finished");
                startColumn += 1;
              });
              startRow += 1;
            });
          });
        });
      });
    });
  };

  const parseClipboardContent = (clipboardContent) => {
    const parsedData = [];

    // first we need to figure out how many rows we need to paste
    const rows = clipboardContent.split("\n");

    // for each row parse cell data
    let i = 0;
    rows.forEach((row) => {
      parsedData[i] = row.split("\t");
      i += 1;
    });
    return parsedData;
  };

  const pasteFromText = (txt) => {
    const lines = txt
      .split("\r\n")
      .map((it) => it.replace(/"/g, "").split("\t"));
    if (lines.length > 0) lines.length -= 1;
    persistDataChange(() => {
      rows.paste(lines, rangeSelector.range);
    });
  };

  const autofill = (cellRange, what, error = () => {}) => {
    const srcRange = rangeSelector.range;
    if (!canPaste(srcRange, cellRange, error)) return false;
    persistDataChange(() => {
      // copyPaste(srcRange, cellRange, what, true);
    });
    return true;
  };

  const calSelectedRangeByEnd = (ri, ci) => {
    let { sri, sci, eri, eci } = rangeSelector.range;
    const { ri: cri, ci: cci } = rangeSelector.getIndexes();
    let [nri, nci] = [ri, ci];
    if (ri < 0) nri = rows.len - 1;
    if (ci < 0) nci = cols.len - 1;
    if (nri > cri) [sri, eri] = [cri, nri];
    else [sri, eri] = [nri, cri];
    if (nci > cci) [sci, eci] = [cci, nci];
    else [sci, eci] = [nci, cci];
    rangeSelector.range = merges.union(new CellRange(sri, sci, eri, eci));
    rangeSelector.range = merges.union(rangeSelector.range);
    // console.log('rangeSelector.range:', rangeSelector.range);
    return rangeSelector.range;
  };

  const calSelectedRangeByStart = (ri, ci) => {
    let cellRange = merges.getFirstIncludes(ri, ci);
    // console.log('cellRange:', cellRange, ri, ci, merges);
    if (cellRange === null) {
      cellRange = new CellRange(ri, ci, ri, ci);
      if (ri === -1) {
        cellRange.sri = 0;
        cellRange.eri = rows.len - 1;
      }
      if (ci === -1) {
        cellRange.sci = 0;
        cellRange.eci = cols.len - 1;
      }
    }
    rangeSelector.range = cellRange;
    return cellRange;
  };

  const setSelectedCellAttr = (property, value) => {
    persistDataChange(() => {
      if (property === "merge") {
        if (value) merge();
        else unmerge();
      } else if (property === "border") {
        setStyleBorders(value);
      } else if (property === "formula") {
        const { range } = rangeSelector;
        const { ri, ci } = rangeSelector.getIndexes();
        if (rangeSelector.range.multiple()) {
          const [rn, cn] = rangeSelector.range.size();
          const { sri, sci, eri, eci } = range;
          if (rn > 1) {
            for (let i = sci; i <= eci; i += 1) {
              rows._setCellText(
                eri + 1,
                i,
                `=${value}(${xy2expr(i, sri)}:${xy2expr(i, eri)})`,
              );
            }
          } else if (cn > 1) {
            rows._setCellText(
              ri,
              eci + 1,
              `=${value}(${xy2expr(sci, ri)}:${xy2expr(eci, ri)})`,
            );
          }
        } else {
          rows._setCellText(ri, ci, `=${value}()`);
        }
      } else {
        rangeSelector.range.each((ri, ci) => {
          const cell = rows.getCellOrNew(ri, ci);
          let cstyle = {};
          if (cell.style !== undefined) {
            cstyle = helper.cloneDeep(styles[cell.style]);
          }
          if (property === "format") {
            cstyle.format = value.key;
            addStyle(ri, ci, cstyle);
          } else if (
            property === "font-bold" ||
            property === "font-italic" ||
            property === "font-name" ||
            property === "font-size"
          ) {
            const nfont = {};
            nfont[property.split("-")[1]] = value;
            cstyle.font = Object.assign(cstyle.font || {}, nfont);
            addStyle(ri, ci, cstyle);
          } else if (
            property === "strike" ||
            property === "textwrap" ||
            property === "underline" ||
            property === "align" ||
            property === "valign" ||
            property === "color" ||
            property === "bgcolor"
          ) {
            cstyle[property] = value;
            addStyle(ri, ci, cstyle);
          } else {
            rows.setCell(ri, ci, {
              [property]: value,
            });
          }
        });
      }
    });
  };

  // state: input | finished
  const setSelectedCellText = (text, state = "input") => {
    const { ri, ci } = rangeSelector.getIndexes();
    let nri = ri;
    if (unsortedRowMap.has(ri)) {
      nri = unsortedRowMap.get(ri);
    }
    // const oldCell = rows.getCell(nri, ci);
    // const oldText = oldCell ? oldCell.text : "";

    setCellText(nri, ci, text, state);

    if (autoFilter.active()) {
      const filter = autoFilter.getFilter(ci);
      if (filter) {
        // const vIndex = filter.value.findIndex((v) => v === oldText);
        // if (vIndex >= 0) {
        //   filter.value.splice(vIndex, 1, text);
        // }
      }
    }
  };

  const getSelectedCell = () => {
    const { ri, ci } = rangeSelector.getIndexes();
    let nri = ri;
    if (unsortedRowMap.has(ri)) {
      nri = unsortedRowMap.get(ri);
    }
    return rows.getCell(nri, ci);
  };

  const xyInSelectedRect = (x, y) => {
    const { left, top, width, height } = getSelectedRect();
    const x1 = x - cols.indexWidth;
    const y1 = y - rows.indexHeight;
    // console.log('x:', x, ',y:', y, 'left:', left, 'top:', top);
    return x1 > left && x1 < left + width && y1 > top && y1 < top + height;
  };

  const getSelectedRect = () => {
    return getRect(rangeSelector.range);
  };

  const getClipboardRect = () => {
    if (!clipboard.isClear()) {
      return getRect(clipboard.getRange());
    }
    return { left: -100, top: -100 };
  };

  const getRect = (cellRange) => {
    const { sri, sci, eri, eci } = cellRange;
    // console.log('sri:', sri, ',sci:', sci, ', eri:', eri, ', eci:', eci);
    // no rangeSelector
    if (sri < 0 && sci < 0) {
      return {
        left: 0,
        l: 0,
        top: 0,
        t: 0,
        scroll,
      };
    }
    const left = cols.sumWidth(0, sci);
    const top = rows.sumHeight(0, sri, exceptRowSet);
    const height = rows.sumHeight(sri, eri + 1, exceptRowSet);
    const width = cols.sumWidth(sci, eci + 1);
    // console.log('sri:', sri, ', sci:', sci, ', eri:', eri, ', eci:', eci);
    let left0 = left - scroll.x;
    let top0 = top - scroll.y;
    const fsh = freezeTotalHeight();
    const fsw = freezeTotalWidth();
    if (fsw > 0 && fsw > left) {
      left0 = left;
    }
    if (fsh > 0 && fsh > top) {
      top0 = top;
    }
    return {
      l: left,
      t: top,
      left: left0,
      top: top0,
      height,
      width,
      scroll,
    };
  };

  const getCellRectByXY = (x, y) => {
    let { ri, top, height } = getCellRowByY(y, scroll.y);
    let { ci, left, width } = getCellColByX(x, scroll.x);
    if (ci === -1) {
      width = cols.totalWidth();
    }
    if (ri === -1) {
      height = rows.totalHeight();
    }
    if (ri >= 0 || ci >= 0) {
      const merge = merges.getFirstIncludes(ri, ci);
      if (merge) {
        ri = merge.sri;
        ci = merge.sci;
        ({ left, top, width, height } = cellRect(ri, ci));
      }
    }
    return {
      ri,
      ci,
      left,
      top,
      width,
      height,
    };
  };

  const isSingleSelected = () => {
    const { sri, sci, eri, eci } = rangeSelector.range;
    const cell = getCell(sri, sci);
    if (cell && cell.merge) {
      const [rn, cn] = cell.merge;
      if (sri + rn === eri && sci + cn === eci) return true;
    }
    return !rangeSelector.range.multiple();
  };

  const canUnmerge = () => {
    const { sri, sci, eri, eci } = rangeSelector.range;
    const cell = getCell(sri, sci);
    if (cell && cell.merge) {
      const [rn, cn] = cell.merge;
      if (sri + rn === eri && sci + cn === eci) return true;
    }
    return false;
  };

  const merge = () => {
    if (isSingleSelected()) return;
    const [rn, cn] = rangeSelector.range.size();

    if (rn > 1 || cn > 1) {
      const { sri, sci } = rangeSelector.range;
      persistDataChange(() => {
        rows.merge(sri, sci, rn, cn);
      });
    }
  };

  const unmerge = () => {
    if (!isSingleSelected()) return;
    const { sri, sci } = rangeSelector.range;
    persistDataChange(() => {
      rows.unmerge(sri, sci);
    });
  };

  const canAutofilter = () => {
    return !autoFilter.active();
  };

  const changeAutofilter = () => {
    persistDataChange(() => {
      if (autoFilter.active()) {
        autoFilter.clear();
        exceptRowSet = new Set();
        sortedRowMap = new Map();
        unsortedRowMap = new Map();
      } else {
        autoFilter.ref = rangeSelector.range.toString();
      }
    });
  };

  const setAutoFilter = (ci, order, operator, value) => {
    autoFilter.addFilter(ci, operator, value);
    autoFilter.setSort(ci, order);
    resetAutoFilter();
  };

  const resetAutoFilter = () => {
    if (!autoFilter.active()) return;
    const { sort } = autoFilter;
    const { rset, fset } = autoFilter.filteredRows((r, c) =>
      rows.getCell(r, c),
    );
    const fary = Array.from(fset);
    const oldAry = Array.from(fset);
    if (sort) {
      fary.sort((a, b) => {
        if (sort.order === "asc") return a - b;
        if (sort.order === "desc") return b - a;
        return 0;
      });
    }
    exceptRowSet = rset;
    sortedRowMap = new Map();
    unsortedRowMap = new Map();
    fary.forEach((it, index) => {
      sortedRowMap.set(oldAry[index], it);
      unsortedRowMap.set(it, oldAry[index]);
    });
  };

  const deleteCell = (deleteFunc) => {
    persistDataChange(() => {
      deleteFunc(rangeSelector.range);
    });
  };

  // type: row | column
  const insert = (type, n = 1) => {
    persistDataChange(() => {
      const { sri, sci } = rangeSelector.range;
      let si = sri;
      if (type === "row") {
        rows.insert(sri, n);
      } else if (type === "column") {
        rows.insertColumn(sci, n);
        si = sci;
        cols.len += 1;
      }
      merges.shift(type, si, n, (ri, ci, rn, cn) => {
        const cell = rows.getCell(ri, ci);
        cell.merge[0] += rn;
        cell.merge[1] += cn;
      });
    });
  };

  // type: row | column
  const deleteData = (type) => {
    persistDataChange(() => {
      const { range } = rangeSelector;
      const { sri, sci, eri, eci } = rangeSelector.range;
      const [rsize, csize] = rangeSelector.range.size();

      let si = sri;
      let size = rsize;
      if (type === "row") {
        rows.deleteRow(sri, eri);
      } else if (type === "column") {
        rows.deleteColumn(sci, eci);

        si = range.sci;
        size = csize;
        cols.len -= 1;
      }
      // console.log('type:', type, ', si:', si, ', size:', size);
      merges.shift(type, si, -size, (ri, ci, rn, cn) => {
        // console.log('ri:', ri, ', ci:', ci, ', rn:', rn, ', cn:', cn);
        const cell = rows.getCell(ri, ci);
        cell.merge[0] += rn;
        cell.merge[1] += cn;
        if (cell.merge[0] === 0 && cell.merge[1] === 0) {
          delete cell.merge;
        }
      });
    });
  };

  const scrollx = (x, cb) => {
    const [, fci] = freeze;
    const [ci, left, width] = helper.rangeReduceIf(
      fci,
      cols.len,
      0,
      0,
      x,
      (i) => cols.getWidth(i),
    );
    // console.log('fci:', fci, ', ci:', ci);
    let x1 = left;
    if (x > 0) x1 += width;
    if (scroll.x !== x1) {
      scroll.ci = x > 0 ? ci : 0;
      scroll.x = x1;
      cb();
    }
  };

  const scrolly = (y, cb) => {
    const [fri] = freeze;
    const [ri, top, height] = helper.rangeReduceIf(
      fri,
      rows.len,
      0,
      0,
      y,
      (i) => rows.getHeight(i),
    );
    let y1 = top;
    if (y > 0) y1 += height;
    // console.log('ri:', ri, ' ,y:', y1);
    if (scroll.y !== y1) {
      scroll.ri = y > 0 ? ri : 0;
      scroll.y = y1;
      cb();
    }
  };

  const cellRect = (ri, ci) => {
    const left = cols.sumWidth(0, ci);
    const top = rows.sumHeight(0, ri);
    const cell = rows.getCell(ri, ci);
    let width = cols.getWidth(ci);
    let height = rows.getHeight(ri);
    if (cell) {
      if (cell.merge) {
        const [rn, cn] = cell.merge;
        // console.log('cell.merge:', cell.merge);
        if (rn > 0) {
          for (let i = 1; i <= rn; i += 1) {
            height += rows.getHeight(ri + i);
          }
        }
        if (cn > 0) {
          for (let i = 1; i <= cn; i += 1) {
            width += cols.getWidth(ci + i);
          }
        }
      }
    }
    // console.log('data:', d);
    return {
      left,
      top,
      width,
      height,
      cell,
    };
  };

  const getCell = (ri, ci) => {
    return rows.getCell(ri, ci);
  };

  const getCellStyle = (ri, ci) => {
    const cell = getCell(ri, ci);
    if (cell && cell.style !== undefined) {
      return styles[cell.style];
    }
    return null;
  };

  const getCellStyleOrDefault = (ri, ci) => {
    const cell = rows.getCell(ri, ci);
    const format = getDefaultFormatFromText(
      hyperformula.getCellSerialized({
        row: ri,
        col: ci,
        sheet: getSheetId(),
      }),
    );

    let cellStyle = !isNil(cell?.style) ? { ...styles[cell.style] } : {};

    if (format && !cellStyle.format) {
      cellStyle.format = format;
    }
    return helper.merge(getOptions().style, cellStyle);
  };

  const getSelectedCellStyle = () => {
    const { ri, ci } = rangeSelector.getIndexes();
    return getCellStyleOrDefault(ri, ci);
  };

  // state: input | finished
  const setCellText = (ri, ci, text, state) => {
    if (state === "finished") {
      persistDataChange(() => {
        rows.setCellText(ri, ci, text);
      });
    }
    // validator
    validations.validate(ri, ci, text);
  };

  const freezeIsActive = () => {
    const [ri, ci] = freeze;
    return ri > 0 || ci > 0;
  };

  const setFreeze = (ri, ci) => {
    persistDataChange(() => {
      freeze = [ri, ci];
    });
  };

  const freezeTotalWidth = () => {
    return cols.sumWidth(0, freeze[1]);
  };

  const freezeTotalHeight = () => {
    return rows.sumHeight(0, freeze[0]);
  };

  const freezeViewRange = () => {
    const [ri, ci] = freeze;
    return new CellRange(
      0,
      0,
      ri - 1,
      ci - 1,
      freezeTotalWidth(),
      freezeTotalHeight(),
    );
  };

  const contentRange = () => {
    const [ri, ci] = rows.maxCell();
    const h = rows.sumHeight(0, ri + 1);
    const w = cols.sumWidth(0, ci + 1);
    return new CellRange(0, 0, ri, ci, w, h);
  };

  const exceptRowTotalHeight = (sri, eri) => {
    const exceptRows = Array.from(exceptRowSet);
    let exceptRowTH = 0;
    exceptRows.forEach((ri) => {
      if (ri < sri || ri > eri) {
        const height = rows.getHeight(ri);
        exceptRowTH += height;
      }
    });
    return exceptRowTH;
  };

  const viewRange = () => {
    let { ri, ci } = scroll;
    if (ri <= 0) [ri] = freeze;
    if (ci <= 0) [, ci] = freeze;

    let [x, y] = [0, 0];
    let [eri, eci] = [rows.len, cols.len];
    for (let i = ri; i < rows.len; i += 1) {
      if (!exceptRowSet.has(i)) {
        y += rows.getHeight(i);
        eri = i;
      }
      if (y > getViewWidthHeight().height) break;
    }
    for (let j = ci; j < cols.len; j += 1) {
      x += cols.getWidth(j);
      eci = j;
      if (x > getViewWidthHeight().width) break;
    }

    return new CellRange(ri, ci, eri, eci, x, y);
  };

  const eachMergesInView = (viewRange, cb) => {
    merges.filterIntersects(viewRange).forEach((it) => cb(it));
  };

  const hideRowsOrCols = () => {
    const [rlen, clen] = rangeSelector.range.size();
    const { sri, sci, eri, eci } = rangeSelector.range;
    if (rlen === rows.len) {
      for (let ci = sci; ci <= eci; ci += 1) {
        cols.setHide(ci, true);
      }
    } else if (clen === cols.len) {
      for (let ri = sri; ri <= eri; ri += 1) {
        rows.setHide(ri, true);
      }
    }
  };

  // type: row | col
  // index row-index | col-index
  const unhideRowsOrCols = (type, index) => {
    if (type === "row") {
      rows.unhide(index);
    }

    if (type === "col") {
      cols.unhide(index);
    }
  };

  const rowEach = (min, max, cb) => {
    let y = 0;
    const frset = exceptRowSet;
    const frary = [...frset];
    let offset = 0;
    for (let i = 0; i < frary.length; i += 1) {
      if (frary[i] < min) {
        offset += 1;
      }
    }
    // console.log('min:', min, ', max:', max, ', scroll:', scroll);
    for (let i = min + offset; i <= max + offset; i += 1) {
      if (frset.has(i)) {
        offset += 1;
      } else {
        const rowHeight = rows.getHeight(i);
        if (rowHeight > 0) {
          cb(i, y, rowHeight);
          y += rowHeight;
          if (y > getViewWidthHeight().height) break;
        }
      }
    }
  };

  const colEach = (min, max, cb) => {
    let x = 0;
    for (let i = min; i <= max; i += 1) {
      const colWidth = cols.getWidth(i);
      if (colWidth > 0) {
        cb(i, x, colWidth);
        x += colWidth;
        if (x > getViewWidthHeight().width) break;
      }
    }
  };

  const addStyle = (ri, ci, nstyle) => {
    for (let i = 0; i < styles.length; i += 1) {
      const style = styles[i];

      if (helper.equals(style, nstyle)) {
        rows.setCell(ri, ci, {
          style: i,
        });
        return;
      }
    }

    styles.push(nstyle);

    rows.setCell(ri, ci, {
      style: styles.length - 1,
    });
  };

  const setData = (d) => {
    Object.keys(d).forEach((property) => {
      if (property === "merges") {
        merges.setData(d.merges);
      }
      if (property === "rows") {
        rows.setData(d.rows);
      }
      if (property === "cols") {
        cols.setData(d.cols);
      }
      if (property === "validations") {
        validations.setData(d.validations);
      }
      if (property === "freeze") {
        const [x, y] = expr2xy(d.freeze);
        freeze = [y, x];
      }
      if (property === "autofilter") {
        autoFilter.setData(d.autofilter);
      }
    });

    if (d.name !== undefined) {
      name = d.name;
    }

    if (d.styles !== undefined) {
      styles = [...d.styles];
    }

    calculationOrder = d.calculationOrder;

    const sheetId = hyperformula.getSheetId(name);

    hyperformula.setSheetContent(sheetId, d.serializedValues);

    if (getOptions().debugMode) {
      console.log(
        `registered sheet content: ${name} (sheet id: ${sheetId})`,
        hyperformula.getSheetFormulas(sheetId),
      );
    }
  };

  const getFreeze = () => {
    return freeze;
  };

  const getData = () => {
    return {
      name,
      calculationOrder,
      freeze: xy2expr(freeze[1], freeze[0]),
      styles: [...styles],
      merges: merges.getData(),
      rows: rows.getData(),
      cols: cols.getData(),
      validations: validations.getData(),
      autofilter: autoFilter.getData(),
      serializedValues: hyperformula.getSheetSerialized(getSheetId()),
    };
  };

  // src: cellRange
  // dst: cellRange
  function canPaste(src, dst, error = () => {}) {
    const cellRange = dst.clone();
    const [srn, scn] = src.size();
    const [drn, dcn] = dst.size();
    if (srn > drn) {
      cellRange.eri = dst.sri + srn - 1;
    }
    if (scn > dcn) {
      cellRange.eci = dst.sci + scn - 1;
    }
    if (merges.intersects(cellRange)) {
      error(t("error.pasteForMergedCell"));
      return false;
    }
    return true;
  }

  function cutPaste(srcCellRange, dstCellRange) {
    rows.cutPaste(srcCellRange, dstCellRange);
    merges.move(
      srcCellRange,
      dstCellRange.sri - srcCellRange.sri,
      dstCellRange.sci - srcCellRange.sci,
    );
    clipboard.clear();
  }

  // bss: { top, bottom, left, right }
  function setStyleBorder(ri, ci, bss) {
    const cell = rows.getCellOrNew(ri, ci);
    let cstyle = {};
    if (cell.style !== undefined) {
      cstyle = helper.cloneDeep(styles[cell.style]);
    }
    cstyle = helper.merge(cstyle, { border: bss });
    addStyle(cstyle);
  }

  function setStyleBorders({ mode, style, color }) {
    const { sri, sci, eri, eci } = rangeSelector.range;
    const multiple = !isSingleSelected();
    if (!multiple) {
      if (mode === "inside" || mode === "horizontal" || mode === "vertical") {
        return;
      }
    }
    if (mode === "outside" && !multiple) {
      setStyleBorder(sri, sci, {
        top: [style, color],
        bottom: [style, color],
        left: [style, color],
        right: [style, color],
      });
    } else if (mode === "none") {
      rangeSelector.range.each((ri, ci) => {
        const cell = rows.getCell(ri, ci);
        if (cell && cell.style !== undefined) {
          const ns = helper.cloneDeep(styles[cell.style]);

          delete ns.border;

          addStyle(ns);
        }
      });
    } else if (
      mode === "all" ||
      mode === "inside" ||
      mode === "outside" ||
      mode === "horizontal" ||
      mode === "vertical"
    ) {
      const merges = [];
      for (let ri = sri; ri <= eri; ri += 1) {
        for (let ci = sci; ci <= eci; ci += 1) {
          // jump merges -- start
          const mergeIndexes = [];
          for (let ii = 0; ii < merges.length; ii += 1) {
            const [mri, mci, rn, cn] = merges[ii];
            if (ri === mri + rn + 1) mergeIndexes.push(ii);
            if (mri <= ri && ri <= mri + rn) {
              if (ci === mci) {
                ci += cn + 1;
                break;
              }
            }
          }
          mergeIndexes.forEach((it) => merges.splice(it, 1));
          if (ci > eci) break;
          // jump merges -- end
          const cell = rows.getCell(ri, ci);
          let [rn, cn] = [0, 0];
          if (cell && cell.merge) {
            [rn, cn] = cell.merge;
            merges.push([ri, ci, rn, cn]);
          }
          const mrl = rn > 0 && ri + rn === eri;
          const mcl = cn > 0 && ci + cn === eci;
          let bss = {};
          if (mode === "all") {
            bss = {
              bottom: [style, color],
              top: [style, color],
              left: [style, color],
              right: [style, color],
            };
          } else if (mode === "inside") {
            if (!mcl && ci < eci) bss.right = [style, color];
            if (!mrl && ri < eri) bss.bottom = [style, color];
          } else if (mode === "horizontal") {
            if (!mrl && ri < eri) bss.bottom = [style, color];
          } else if (mode === "vertical") {
            if (!mcl && ci < eci) bss.right = [style, color];
          } else if (mode === "outside" && multiple) {
            if (sri === ri) bss.top = [style, color];
            if (mrl || eri === ri) bss.bottom = [style, color];
            if (sci === ci) bss.left = [style, color];
            if (mcl || eci === ci) bss.right = [style, color];
          }
          if (Object.keys(bss).length > 0) {
            setStyleBorder(ri, ci, bss);
          }
          ci += cn;
        }
      }
    } else if (mode === "top" || mode === "bottom") {
      for (let ci = sci; ci <= eci; ci += 1) {
        if (mode === "top") {
          setStyleBorder(sri, ci, { top: [style, color] });
          ci += rows.getCellMerge(sri, ci)[1];
        }
        if (mode === "bottom") {
          setStyleBorder(eri, ci, { bottom: [style, color] });
          ci += rows.getCellMerge(eri, ci)[1];
        }
      }
    } else if (mode === "left" || mode === "right") {
      for (let ri = sri; ri <= eri; ri += 1) {
        if (mode === "left") {
          setStyleBorder(ri, sci, { left: [style, color] });
          ri += rows.getCellMerge(ri, sci)[0];
        }
        if (mode === "right") {
          setStyleBorder(ri, eci, { right: [style, color] });
          ri += rows.getCellMerge(ri, eci)[0];
        }
      }
    }
  }

  function getCellRowByY(y, scrollOffsety) {
    const fsh = freezeTotalHeight();
    // console.log('y:', y, ', fsh:', fsh);
    let inits = rows.indexHeight;
    if (fsh + rows.indexHeight < y) inits -= scrollOffsety;

    // handle ri in autofilter
    const frset = exceptRowSet;

    let ri = 0;
    let top = inits;
    let { indexHeight } = rows;
    for (; ri < rows.len; ri += 1) {
      if (top > y) break;
      if (!frset.has(ri)) {
        indexHeight = rows.getHeight(ri);
        top += indexHeight;
      }
    }
    top -= indexHeight;
    // console.log('ri:', ri, ', top:', top, ', height:', height);

    if (top <= 0) {
      return { ri: -1, top: 0, height: indexHeight };
    }

    return { ri: ri - 1, top, height: indexHeight };
  }

  function getCellColByX(x, scrollOffsetx) {
    const fsw = freezeTotalWidth();
    let inits = cols.indexWidth;
    if (fsw + cols.indexWidth < x) inits -= scrollOffsetx;
    const [ci, left, width] = helper.rangeReduceIf(
      0,
      cols.len,
      inits,
      cols.indexWidth,
      x,
      (i) => cols.getWidth(i),
    );
    if (left <= 0) {
      return { ci: -1, left: 0, width: cols.indexWidth };
    }
    return { ci: ci - 1, left, width };
  }

  const getSheetId = () => {
    const sheetId = hyperformula.getSheetId(name);

    if (sheetId === undefined) throw new Error("sheetId cannot be undefined");

    return sheetId;
  };

  return {
    getSheetId,
    name,
    rows,
    cols,
    merges,
    getRect,
    contentRange,
    eachMergesInView,
    freezeTotalWidth,
    freezeTotalHeight,
    rangeSelector,
    getSelectedRect,
    getClipboardRect,
    calSelectedRangeByStart,
    persistDataChange,
    setData,
    setFreeze,
    getCell,
    getCellRectByXY,
    scroll,
    exceptRowTotalHeight,
    freeze,
    copy,
    cut,
    parseClipboardContent,
    pasteFromSystemClipboard,
    pasteFromText,
    hideRowsOrCols,
    unhideRowsOrCols,
    autoFilter,
    autofill,
    getSelectedCell,
    getSelectedValidator,
    scrolly,
    scrollx,
    setSelectedCellText,
    insert,
    getData,
    deleteData,
    deleteCell,
    setSelectedCellAttr,
    paste,
    setAutoFilter,
    xyInSelectedRect,
    addValidation,
    removeValidation,
    getSelectedValidation,
    cellRect,
    getCellStyle,
    validations,
    rowEach,
    colEach,
    viewRange,
    freezeViewRange,
    getSelectedCellStyle,
    canUnmerge,
    canAutofilter,
    freezeIsActive,
    changeAutofilter,
    calSelectedRangeByEnd,
    sortedRowMap,
    exceptRowSet,
    getCellStyleOrDefault,
    getFreeze,
    history,
  };
};
