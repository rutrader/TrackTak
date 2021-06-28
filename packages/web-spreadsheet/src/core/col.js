import helper from "./helper";

class Cols {
  constructor(getCol) {
    this.cols = {};
    this.len = getCol().len;
    this.width = getCol().width;
    this.indexWidth = getCol().indexWidth;

    this.minWidth = getCol().minWidth;
  }

  setData(d) {
    this.cols = { ...d };
  }

  getData() {
    return { ...this.cols };
  }

  getWidth(i) {
    if (this.isHide(i)) return 0;
    const col = this.cols[i];
    if (col && col.width) {
      return col.width;
    }
    return this.width;
  }

  getOrNew(ci) {
    this.cols[ci] = this.cols[ci] || {};
    return this.cols[ci];
  }

  setWidth(ci, width) {
    const col = this.getOrNew(ci);
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
    const col = this.getOrNew(ci);
    if (v === true) col.hide = true;
    else delete col.hide;
  }

  setStyle(ci, style) {
    const col = this.getOrNew(ci);
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
