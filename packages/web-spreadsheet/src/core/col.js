import helper from "./helper";

class Cols {
  constructor(getCol) {
    this.cols = {};
    this.len = getCol().len;
    this.width = getCol().width;
    this.indexWidth = getCol().indexWidth;

    this.minWidth = getCol().minWidth;
  }

  setData(cols) {
    this.cols = helper.cloneDeep(cols);
  }

  getData() {
    return helper.cloneDeep(this.cols);
  }

  createNewCol(ci) {
    this.cols[ci] = {};

    return this.cols[ci];
  }

  getWidth(i) {
    if (this.isHide(i)) return 0;
    const col = this.cols[i];
    if (col && col.width) {
      return col.width;
    }
    return this.width;
  }

  get(ci) {
    let col = this.cols[ci];

    if (!col) {
      col = this.createNewCol(ci);
    }

    return col;
  }

  setWidth(ci, width) {
    const col = this.get(ci);
    col.width = width;
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

  isHide(ci) {
    const col = this.cols[ci];
    return col && col.hide;
  }

  setHide(ci, v) {
    const col = this.get(ci);
    if (v === true) col.hide = true;
    else delete col.hide;
  }

  setStyle(ci, style) {
    const col = this.get(ci);
    col.style = style;
  }

  sumWidth(min, max) {
    return helper.rangeSum(min, max, (i) => this.getWidth(i));
  }

  totalWidth() {
    return this.sumWidth(0, this.len);
  }
}

export { Cols };
