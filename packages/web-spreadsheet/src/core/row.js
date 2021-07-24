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

    if (!row.cells?.[ci]) {
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

  getNewDstCellRange = (srcCellRange, dstCellRange) => {
    const srcRowNum = srcCellRange.eri - srcCellRange.sri;
    const srcColNum = srcCellRange.eci - srcCellRange.sci;

    const dstRowNum = dstCellRange.eri - dstCellRange.sri;
    const dstColNum = dstCellRange.eci - dstCellRange.sci;

    const eri =
      srcRowNum > dstRowNum ? dstCellRange.eri + srcRowNum : dstCellRange.eri;

    const eci =
      srcColNum > dstColNum ? dstCellRange.eci + srcColNum : dstCellRange.eci;

    const newDstCellRange = new CellRange(
      dstCellRange.sri,
      dstCellRange.sci,
      eri,
      eci,
    );

    return newDstCellRange;
  };

  loopThroughCellsInSrcDstRange = (srcCellRange, dstCellRange, callback) => {
    const newDstCellRange = this.getNewDstCellRange(srcCellRange, dstCellRange);

    const [rn, cn] = srcCellRange.size();

    for (let ssri = srcCellRange.sri; ssri <= srcCellRange.eri; ssri++) {
      for (let ssci = srcCellRange.sci; ssci <= srcCellRange.eci; ssci++) {
        for (
          let dsri = newDstCellRange.sri;
          dsri <= newDstCellRange.eri;
          dsri += rn
        ) {
          for (
            let dsci = newDstCellRange.sci;
            dsci <= newDstCellRange.eci;
            dsci += cn
          ) {
            const ri = dsri + (ssri - srcCellRange.sri);
            const ci = dsci + (ssci - srcCellRange.sci);

            if (ri <= newDstCellRange.eri && ci <= newDstCellRange.eci) {
              callback({
                ri,
                ci,
                sri: ssri,
                sci: ssci,
              });
            }
          }
        }
      }
    }
  };

  addMergesToCell = (sri, sci, ri, ci) => {
    const sourceCell = this.rows[sri].cells[sci];
    const destCell = this.rows[ri].cells[ci];

    if (sourceCell.merge) {
      destCell.merge = sourceCell.merge;

      const [rn, cn] = destCell.merge;

      if (rn <= 0 && cn <= 0) return;

      this.merges.add(new CellRange(ri, ci, ri + rn, ci + cn));
    }
  };

  copyPasteAll = (srcCellRange, dstCellRange) => {
    this.deleteCells(this.rangeSelector.range);
    this.copyPasteText(srcCellRange, dstCellRange);

    this.loopThroughCellsInSrcDstRange(
      srcCellRange,
      dstCellRange,
      ({ sri, sci, ri, ci }) => {
        this.rows[ri].cells[ci] = this.rows[sri].cells[sci];

        this.addMergesToCell(sri, sci, ri, ci);
      },
    );
  };

  copyPasteFormat = (srcCellRange, dstCellRange) => {
    this.deleteCellsFormat(this.rangeSelector.range);

    this.loopThroughCellsInSrcDstRange(
      srcCellRange,
      dstCellRange,
      ({ sri, sci, ri, ci }) => {
        const sourceCell = this.rows[sri].cells[sci];
        const destCell = this.rows[ri].cells[ci];

        destCell.style = sourceCell.style;

        this.addMergesToCell(sri, sci, ri, ci);
      },
    );
  };

  copyPasteText = (srcCellRange, dstCellRange) => {
    const sheet = this.getDataProxy().getSheetId();

    const source = srcCellRange.toHyperformulaFormat(sheet);
    const target = this.getNewDstCellRange(
      srcCellRange,
      dstCellRange,
    ).toHyperformulaFormat(sheet);

    const data = this.hyperformula.getFillRangeData(source, target, true);

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
      ({ sri, sci, ri, ci }) => {
        this.rows[ri].cells[ci] = this.rows[sri].cells[sci];

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

  merge = (ri, ci, rn, cn) => {
    const newCell = this.rows[ri].cells[ci];

    this.setCell(ri, ci, newCell);

    newCell.merge = [rn - 1, cn - 1];

    this.merges.add(this.rangeSelector.range);

    this.deleteCells(this.rangeSelector.range);

    this.setCell(ri, ci, newCell);
  };

  unmerge = (ri, ci) => {
    delete this.rows[ri].cells[ci].merge;

    this.merges.deleteWithin(this.rangeSelector.range);
  };

  deleteCellsText = (cellRange) => {
    const source = cellRange.toHyperformulaFormat(
      this.getDataProxy().getSheetId(),
    );

    let data = this.hyperformula.getRangeValues(source);

    data = data.map((row) => {
      return row.map(() => {
        return "";
      });
    });

    this.hyperformula.setCellContents(source.start, data);
  };

  deleteCellsFormat = (cellRange) => {
    cellRange.loopWithinRange(({ ri, ci }) => {
      delete this.rows[ri].cells[ci].style;
      delete this.rows[ri].cells[ci].merge;
    });
    this.merges.deleteWithin(cellRange);
  };

  deleteCells = (cellRange) => {
    cellRange.loopWithinRange(({ ri, ci }) => {
      delete this.rows[ri].cells[ci];
    });
    this.merges.deleteWithin(cellRange);
  };

  maxCell() {
    const ri = this.rows[this.len - 1];
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
