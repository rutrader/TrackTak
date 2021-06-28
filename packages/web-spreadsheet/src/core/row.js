import helper from "./helper";
import convertIndexesToAmount from "../shared/convertIndexesToAmount";

class Rows {
  constructor(getRow, getDataProxy, hyperformula) {
    this.rows = [];
    this.len = getRow().len;
    this.getDataProxy = getDataProxy;
    // default row height
    this.height = getRow().height;
    this.indexHeight = getRow().indexHeight;

    this.hyperformula = hyperformula;
  }

  getHeight(ri) {
    if (this.isHide(ri)) return 0;
    const row = this.get(ri);
    if (row && row.height) {
      return row.height;
    }
    return this.height;
  }

  setHeight(ri, v) {
    const row = this.getOrNew(ri);
    row.height = v;
  }

  unhide(idx) {
    let index = idx;
    while (index > 0) {
      index -= 1;
      if (this.isHide(index)) {
        this.setHide(index, false);
      } else break;
    }
  }

  isHide(ri) {
    const row = this.get(ri);
    return row && row.hide;
  }

  setHide(ri, v) {
    const row = this.getOrNew(ri);
    if (v === true) row.hide = true;
    else delete row.hide;
  }

  setStyle(ri, style) {
    const row = this.getOrNew(ri);
    row.style = style;
  }

  sumHeight(min, max, exceptSet) {
    return helper.rangeSum(min, max, (i) => {
      if (exceptSet && exceptSet.has(i)) return 0;
      return this.getHeight(i);
    });
  }

  totalHeight() {
    return this.sumHeight(0, this.len);
  }

  get(ri) {
    return { ...this.rows[ri] };
  }

  getOrNew(ri) {
    this.rows[ri] = this.rows[ri] || { cells: [] };

    return { ...this.rows[ri] };
  }

  getCell(ri, ci) {
    const row = this.get(ri);
    if (
      row !== undefined &&
      row.cells !== undefined &&
      row.cells[ci] !== undefined
    ) {
      return { ...row.cells[ci] };
    }

    return undefined;
  }

  getCellMerge(ri, ci) {
    const cell = this.getCell(ri, ci);
    if (cell && cell.merge) return cell.merge;
    return [0, 0];
  }

  getCellOrNew(ri, ci) {
    const row = this.getOrNew(ri);
    row.cells[ci] = row.cells[ci] || [];

    return { ...row.cells[ci] };
  }

  // what: all | text | format
  setCell(ri, ci, cell, what = "all") {
    const row = this.getOrNew(ri);

    const paste = () => {
      this.hyperformula.paste({
        col: ci,
        row: ri,
        sheet: this.getDataProxy().getSheetId(),
      });
    };

    if (what === "all") {
      row.cells[ci] = cell;
      paste();
    } else if (what === "text") {
      paste();
    } else if (what === "format") {
      row.cells[ci] = row.cells[ci] || [];
      row.cells[ci].style = cell.style;

      if (cell.merge) {
        row.cells[ci].merge = cell.merge;
      }
    }
  }

  _setCellText = (ri, ci, text) => {
    let newText = text;

    this.hyperformula.setCellContents(
      { col: ci, row: ri, sheet: this.getDataProxy().getSheetId() },
      [[newText]],
    );
  };

  setCellText(ri, ci, text) {
    const cell = this.getCellOrNew(ri, ci);
    if (cell.editable === false) return;

    this._setCellText(ri, ci, text);
  }

  // what: all | format | text
  copyPaste(srcCellRange, dstCellRange, what, autofill = false, cb = () => {}) {
    const { sri, sci, eri, eci } = srcCellRange;
    const dsri = dstCellRange.sri;
    const dsci = dstCellRange.sci;
    const deri = dstCellRange.eri;
    const deci = dstCellRange.eci;
    const [rn, cn] = srcCellRange.size();
    const [drn, dcn] = dstCellRange.size();

    let isAdd = true;
    let dn = 0;
    if (deri < sri || deci < sci) {
      isAdd = false;
      if (deri < sri) dn = drn;
      else dn = dcn;
    }
    for (let i = sri; i <= eri; i += 1) {
      if (this.rows[i]) {
        for (let j = sci; j <= eci; j += 1) {
          if (this.rows[i].cells && this.rows[i].cells[j]) {
            for (let ii = dsri; ii <= deri; ii += rn) {
              for (let jj = dsci; jj <= deci; jj += cn) {
                const nri = ii + (i - sri);
                const nci = jj + (j - sci);
                const ncell = helper.cloneDeep(this.rows[i].cells[j]);

                this.setCell(nri, nci, ncell, what);
                cb(nri, nci, ncell);
              }
            }
          }
        }
      }
    }
  }

  cutPaste(srcCellRange, dstCellRange) {
    const ncellmm = [];
    this.each((ri) => {
      this.eachCells(ri, (ci) => {
        let nri = parseInt(ri, 10);
        let nci = parseInt(ci, 10);
        if (srcCellRange.includes(ri, ci)) {
          nri = dstCellRange.sri + (nri - srcCellRange.sri);
          nci = dstCellRange.sci + (nci - srcCellRange.sci);

          this.hyperformula.paste({
            col: nci,
            row: nri,
            sheet: this.getDataProxy().getSheetId(),
          });
        }
        ncellmm[nri] = ncellmm[nri] || { cells: [] };
        ncellmm[nri].cells[nci] = this.rows[ri].cells[ci];
      });
    });
    this.rows = ncellmm;
  }

  // src: Array<Array<String>>
  paste(src, dstCellRange) {
    if (src.length <= 0) return;
    const { sri, sci } = dstCellRange;
    src.forEach((row, i) => {
      const ri = sri + i;
      row.forEach((cell, j) => {
        const ci = sci + j;
        this.setCellText(ri, ci, cell);
      });
    });
  }

  insert(sri, n = 1) {
    const sheetId = this.getDataProxy().getSheetId();

    if (!this.hyperformula.isItPossibleToAddRows(sheetId)) return;

    this.hyperformula.addRows(sheetId, [sri, n]);
  }

  deleteRow(sri, eri) {
    const sheetId = this.getDataProxy().getSheetId();

    if (!this.hyperformula.isItPossibleToRemoveRows(sheetId)) return;

    this.hyperformula.removeRows(sheetId, [
      sri,
      convertIndexesToAmount(sri, eri),
    ]);
  }

  insertColumn(sci, n = 1) {
    const sheetId = this.getDataProxy().getSheetId();

    if (!this.hyperformula.isItPossibleToAddColumns(sheetId)) return;

    this.hyperformula.addColumns(sheetId, [sci, n]);
  }

  deleteColumn(sci, eci) {
    const sheetId = this.getDataProxy().getSheetId();

    if (!this.hyperformula.isItPossibleToRemoveColumns(sheetId)) return;

    this.hyperformula.removeColumns(sheetId, [
      sci,
      convertIndexesToAmount(sci, eci),
    ]);
  }

  // what: all | text | format | merge
  deleteCells(cellRange, what = "all") {
    cellRange.each((i, j) => {
      this.deleteCell(i, j, what);
    });
  }

  // what: all | text | format | merge
  deleteCell(ri, ci, what = "all") {
    const row = this.get(ri);
    if (row) {
      const cell = this.getCell(ri, ci);
      if (cell) {
        if (what === "all") {
          delete row.cells[ci];
        } else if (what === "text") {
          this.hyperformula.setCellContents(
            {
              col: ci,
              row: ri,
              sheet: this.getDataProxy().getSheetId(),
            },
            "",
          );
          if (cell.value) delete cell.value;
        } else if (what === "format") {
          if (cell.style !== undefined) delete cell.style;
          if (cell.merge) delete cell.merge;
        } else if (what === "merge") {
          if (cell.merge) delete cell.merge;
        }
      }
    }
  }

  maxCell() {
    const ri = this.rows[this.rows.length - 1];
    const col = this.rows[ri];
    if (col) {
      const { cells } = col;
      const ks = Object.keys(cells);
      const ci = ks[ks.length - 1];
      return [parseInt(ri, 10), parseInt(ci, 10)];
    }
    return [0, 0];
  }

  each(cb) {
    this.rows.forEach(([ri, row]) => {
      cb(ri, row);
    });
  }

  eachCells(ri, cb) {
    if (this.rows[ri] && this.rows[ri].cells) {
      this.rows[ri].cells.forEach(([ci, cell]) => {
        cb(ci, cell);
      });
    }
  }

  setData(rows) {
    // Rows is a sparse array, so this is to
    // essentially clone the element while preserving empty records
    // this.rows = new Array(rows.length);

    // rows.forEach((row, ri) => {
    //   const newCells = new Array(row.cells.length);

    //   row.cells.forEach((cell, ci) => {
    //     newCells[ci] = { ...cell };
    //   });

    //   this.rows[ri] = {
    //     ...rows[ri],
    //     cells: newCells,
    //   };
    // });
    this.rows = helper.cloneDeep(rows);
  }

  getData() {
    return [...this.rows];
  }
}

export { Rows };
