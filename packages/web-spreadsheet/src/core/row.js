import helper from "./helper";
import convertIndexesToAmount from "../shared/convertIndexesToAmount";
import CellRange from "./cell_range";

class Rows {
  constructor(merges, rangeSelector, getRow, getDataProxy, hyperformula) {
    this.merges = merges;
    this.rangeSelector = rangeSelector;
    this.rows = {};
    this.len = getRow().len;
    this.getDataProxy = getDataProxy;
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
    const row = this.get(ri);
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
    const row = this.get(ri);
    if (v === true) row.hide = true;
    else delete row.hide;
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
    let row = this.rows[ri];

    if (!row) {
      row = this.createNewRow(ri);
    }

    return row;
  }

  getCell(ri, ci) {
    const row = this.get(ri);

    if (!row.cells[ci]) {
      row.cells[ci] = {};
    }

    return row.cells[ci];
  }

  getCellMerge(ri, ci) {
    const cell = this.getCell(ri, ci);
    if (cell && cell.merge) return cell.merge;
    return [0, 0];
  }

  getCellOrNew(ri, ci) {
    const row = this.get(ri);
    const cell = row.cells[ci] || {};

    return cell;
  }

  createNewRow(ri) {
    this.rows[ri] = { cells: {} };

    return this.rows[ri];
  }

  setCell(ri, ci, newCell) {
    if (!this.rows[ri]) {
      this.createNewRow(ri);
    }

    this.rows[ri].cells[ci] = {
      ...this.rows[ri].cells[ci],
      ...newCell,
    };
  }

  setCellText(ri, ci, text) {
    const cell = this.getCellOrNew(ri, ci);

    if (cell.editable === false) return;

    let newText = text;

    this.hyperformula.setCellContents(
      { col: ci, row: ri, sheet: this.getDataProxy().getSheetId() },
      [[newText]],
    );
  }

  loopThroughCellsInSrcDstRange = (srcCellRange, dstCellRange, callback) => {
    const [rn, cn] = srcCellRange.size();

    for (let ssri = srcCellRange.sri; ssri <= srcCellRange.eri; ssri++) {
      for (let ssci = srcCellRange.sci; ssci <= srcCellRange.eci; ssci++) {
        for (
          let dsri = dstCellRange.sri;
          dsri <= dstCellRange.eri;
          dsri += rn
        ) {
          for (
            let dsci = dstCellRange.sci;
            dsci <= dstCellRange.eci;
            dsci += cn
          ) {
            callback({
              newRi: dsri + (ssri - srcCellRange.sri),
              newCi: dsci + (ssci - srcCellRange.sci),
              sri: ssri,
              sci: ssci,
            });
          }
        }
      }
    }
  };

  addMergesToCell = (sri, sci, newRi, newCi) => {
    const sourceCell = this.rows[sri].cells[sci];
    const destCell = this.rows[newRi].cells[newCi];

    if (sourceCell.merge) {
      destCell.merge = sourceCell.merge;

      const [rn, cn] = destCell.merge;

      if (rn <= 0 && cn <= 0) return;

      this.merges.add(new CellRange(newRi, newCi, newRi + rn, newCi + cn));
    }
  };

  copyPasteAll = (srcCellRange, dstCellRange) => {
    // TODO: Paste range not supported yet
    // https://github.com/handsontable/hyperformula/discussions/763
    this.copyPasteText(srcCellRange, dstCellRange);
    this.deleteCells(dstCellRange, "all");
    this.merges.deleteWithin(dstCellRange);

    this.loopThroughCellsInSrcDstRange(
      srcCellRange,
      dstCellRange,
      ({ sri, sci, newRi, newCi }) => {
        this.rows[newRi].cells[newCi] = this.rows[sri].cells[sci];

        this.addMergesToCell(sri, sci, newRi, newCi);
      },
    );
  };

  copyPasteFormat = (srcCellRange, dstCellRange) => {
    this.merges.deleteWithin(dstCellRange);
    this.deleteCells(dstCellRange, "format");

    this.loopThroughCellsInSrcDstRange(
      srcCellRange,
      dstCellRange,
      ({ sri, sci, newRi, newCi }) => {
        const sourceCell = this.rows[sri].cells[sci];
        const destCell = this.rows[newRi].cells[newCi];

        destCell.style = sourceCell.style;

        this.addMergesToCell(sri, sci, newRi, newCi);
      },
    );
  };

  copyPasteText = (srcCellRange, dstCellRange) => {
    const source = {
      start: {
        row: srcCellRange.sri,
        col: srcCellRange.sci,
        sheet: this.getDataProxy().getSheetId(),
      },
      end: {
        row: srcCellRange.eri,
        col: srcCellRange.eci,
        sheet: this.getDataProxy().getSheetId(),
      },
    };

    const target = {
      start: {
        row: dstCellRange.sri,
        col: dstCellRange.sci,
        sheet: this.getDataProxy().getSheetId(),
      },
      end: {
        row: dstCellRange.eri,
        col: dstCellRange.eci,
        sheet: this.getDataProxy().getSheetId(),
      },
    };

    const data = this.hyperformula.getFillRangeData(source, target);

    this.hyperformula.setCellContents(target.start, data);
  };

  cutPaste(srcCellRange, dstCellRange) {
    this.hyperformula.paste({
      col: dstCellRange.sci,
      row: dstCellRange.sri,
      sheet: this.getDataProxy().getSheetId(),
    });

    this.loopThroughCellsInSrcDstRange(
      srcCellRange,
      dstCellRange,
      ({ sri, sci, newRi, newCi }) => {
        this.rows[newRi].cells[newCi] = this.rows[sri].cells[sci];

        delete this.rows[sri].cells[sci];
      },
    );
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

  unmerge = (ri, ci) => {
    delete this.rows[ri].cells[ci].merge;

    this.merges.deleteWithin(this.rangeSelector.range);
  };

  deleteCells(cellRange, what = "all") {
    cellRange.each((i, j) => {
      this.deleteCell(i, j, what);
    });
  }

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
    const ri = this.rows[Object.keys(this.rows.length).length - 1];
    const col = this.rows[ri];
    if (col) {
      const { cells } = col;
      const ks = Object.keys(cells);
      const ci = ks[ks.length - 1];
      return [parseInt(ri, 10), parseInt(ci, 10)];
    }
    return [0, 0];
  }

  setData(rows) {
    this.rows = helper.cloneDeep(rows);
  }

  getData() {
    return helper.cloneDeep(this.rows);
  }
}

export { Rows };
