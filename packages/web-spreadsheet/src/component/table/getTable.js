import { stringAt } from "../../core/alphabet";

import { thinLineWidth, npx, getDrawBox } from "../../canvas/draw";
import { cssPrefix } from "../../config";
import { h } from "../element";
import { getFontSizePxByPt } from "../../core/font";

const tableFixedHeaderCleanStyle = { fillStyle: "#f4f5f8" };
const cellPaddingWidth = 5;
const tableGridStyle = {
  fillStyle: "#fff",
  lineWidth: thinLineWidth,
  strokeStyle: "#e6e6e6",
};

function getTableDrawBox(data, rindex, cindex, yoffset = 0) {
  const { left, top, width, height } = data.cellRect(rindex, cindex);
  return getDrawBox(left, top + yoffset, width, height, cellPaddingWidth);
}

const tableFixedHeaderStyle = () => {
  return {
    textAlign: "center",
    textBaseline: "middle",
    font: `500 ${npx(12)}px Source Sans Pro`,
    fillStyle: "#585757",
    lineWidth: thinLineWidth(),
    strokeStyle: "#e6e6e6",
  };
};

export const getTable = (
  getOptions,
  getData,
  hyperformula,
  getViewWidthHeight,
) => {
  let draw;

  const setDraw = (newDraw) => {
    draw = newDraw;
  };

  const renderSelectedHeaderCell = (x, y, w, h) => {
    draw.save();
    draw.attr({ fillStyle: "rgba(75, 137, 255, 0.08)" });
    draw.fillRect(x, y, w, h);
    draw.restore();
  };

  const renderFixedLeftTopCell = (fw, fh) => {
    draw.save();
    draw.attr({ fillStyle: "#f4f5f8" });
    draw.fillRect(0, 0, fw, fh);
    draw.restore();
  };

  // viewRange
  // type: all | left | top
  // w: the fixed width of header
  // h: the fixed height of header
  // tx: moving distance on x-axis
  // ty: moving distance on y-axis
  const renderFixedHeaders = (type, viewRange, w, h, tx, ty) => {
    const sumHeight = viewRange.h; // rows.sumHeight(viewRange.sri, viewRange.eri + 1);
    const sumWidth = viewRange.w; // cols.sumWidth(viewRange.sci, viewRange.eci + 1);
    const nty = ty + h;
    const ntx = tx + w;

    draw.save();
    // draw rect background
    draw.attr(tableFixedHeaderCleanStyle);
    if (type === "all" || type === "left") draw.fillRect(0, nty, w, sumHeight);
    if (type === "all" || type === "top") draw.fillRect(ntx, 0, sumWidth, h);

    const { sri, sci, eri, eci } = getData().selector.range;
    // console.log(data.selectIndexes);
    // draw text
    // text font, align...
    draw.attr(tableFixedHeaderStyle());
    // y-header-text
    if (type === "all" || type === "left") {
      getData().rowEach(viewRange.sri, viewRange.eri, (i, y1, rowHeight) => {
        const y = nty + y1;
        const ii = i;
        draw.line([0, y], [w, y]);
        if (sri <= ii && ii < eri + 1) {
          renderSelectedHeaderCell(0, y, w, rowHeight);
        }
        draw.fillText(ii + 1, w / 2, y + rowHeight / 2);
        if (i > 0 && getData().rows.isHide(i - 1)) {
          draw.save();
          draw.attr({ strokeStyle: "#c6c6c6" });
          draw.line([5, y + 5], [w - 5, y + 5]);
          draw.restore();
        }
      });
      draw.line([0, sumHeight + nty], [w, sumHeight + nty]);
      draw.line([w, nty], [w, sumHeight + nty]);
    }
    // x-header-text
    if (type === "all" || type === "top") {
      getData().colEach(viewRange.sci, viewRange.eci, (i, x1, colWidth) => {
        const x = ntx + x1;
        const ii = i;
        draw.line([x, 0], [x, h]);
        if (sci <= ii && ii < eci + 1) {
          renderSelectedHeaderCell(x, 0, colWidth, h);
        }
        draw.fillText(stringAt(ii), x + colWidth / 2, h / 2);
        if (i > 0 && getData().cols.isHide(i - 1)) {
          draw.save();
          draw.attr({ strokeStyle: "#c6c6c6" });
          draw.line([x + 5, 5], [x + 5, h - 5]);
          draw.restore();
        }
      });
      draw.line([sumWidth + ntx, 0], [sumWidth + ntx, h]);
      draw.line([0, h], [sumWidth + ntx, h]);
    }
    draw.restore();
  };

  const el = h("canvas", `${cssPrefix}-table`);

  const renderCell = (draw, data, rindex, cindex, yoffset = 0) => {
    const { sortedRowMap, rows, cols } = data;
    if (rows.isHide(rindex) || cols.isHide(cindex)) return;
    let nrindex = rindex;
    if (sortedRowMap.has(rindex)) {
      nrindex = sortedRowMap.get(rindex);
    }

    const cell = data.getCell(nrindex, cindex);
    if (cell === null) return;
    let frozen = false;
    if ("editable" in cell && cell.editable === false) {
      frozen = true;
    }

    const style = data.getCellStyleOrDefault(nrindex, cindex);
    const dbox = getTableDrawBox(data, rindex, cindex, yoffset);
    dbox.bgcolor = style.bgcolor;
    if (style.border !== undefined) {
      // bboxes.push({ ri: rindex, ci: cindex, box: dbox });
      draw.strokeBorders(style.border, dbox);
    }

    const cellAddress = {
      col: cindex,
      row: rindex,
      sheet: getData().getSheetId(),
    };

    draw.rect(dbox, () => {
      const showAllFormulas = getOptions().showAllFormulas;
      const formats = getOptions().formats;

      // render text
      let cellText = "";
      let format = style.format;

      if (showAllFormulas) {
        cellText = cell.text;
        if (hyperformula.doesCellHaveFormula(cellAddress)) {
          format = "text";
        }
      } else {
        cellText = hyperformula.getCellValue(cellAddress);
      }
      cellText = formats[format].render(cellText);

      if (cellText.value) {
        const error = cellText;

        cellText = error.value;

        console.error(error);
      }

      const font = Object.assign({}, style.font);
      font.size = getFontSizePxByPt(font.size);

      draw.text(
        cellText,
        dbox,
        {
          align: style.align,
          valign: style.valign,
          font,
          color: style.color,
          strike: style.strike,
          underline: style.underline,
        },
        style.textwrap,
      );
      // error
      const error = data.validations.getError(rindex, cindex);
      if (error) {
        draw.error(dbox);
      }
      if (frozen) {
        draw.frozen(dbox);
      }
      if (cell.comment) {
        draw.commentMarker(dbox);
      }
    });
  };

  const renderAutofilter = (viewRange) => {
    if (viewRange) {
      const { autoFilter } = getData();
      if (!autoFilter.active()) return;
      const afRange = autoFilter.hrange();
      if (viewRange.intersects(afRange)) {
        afRange.each((ri, ci) => {
          const dbox = getTableDrawBox(getData(), ri, ci);
          draw.dropdown(dbox);
        });
      }
    }
  };

  const renderContent = (
    viewRange,
    fixedHeaderWidth,
    fixedHeaderHeight,
    tx,
    ty,
  ) => {
    draw.save();
    draw.translate(fixedHeaderWidth, fixedHeaderHeight);
    draw.translate(tx, ty);

    const { exceptRowSet } = getData();
    // const exceptRows = Array.from(exceptRowSet);
    const filteredTranslateFunc = (ri) => {
      const ret = exceptRowSet.has(ri);
      if (ret) {
        const height = getData().rows.getHeight(ri);
        draw.translate(0, -height);
      }
      return !ret;
    };

    const exceptRowTotalHeight = getData().exceptRowTotalHeight(
      viewRange.sri,
      viewRange.eri,
    );
    // 1 render cell
    draw.save();
    draw.translate(0, -exceptRowTotalHeight);
    viewRange.each(
      (ri, ci) => {
        renderCell(draw, getData(), ri, ci);
      },
      (ri) => filteredTranslateFunc(ri),
    );
    draw.restore();

    // 2 render mergeCell
    const rset = new Set();
    draw.save();
    draw.translate(0, -exceptRowTotalHeight);
    getData().eachMergesInView(viewRange, ({ sri, sci, eri }) => {
      if (!exceptRowSet.has(sri)) {
        renderCell(draw, getData(), sri, sci);
      } else if (!rset.has(sri)) {
        rset.add(sri);
        const height = getData().rows.sumHeight(sri, eri + 1);
        draw.translate(0, -height);
      }
    });
    draw.restore();

    // 3 render autofilter
    renderAutofilter(viewRange);

    draw.restore();
  };

  const renderContentGrid = (
    { sri, sci, eri, eci, w, h },
    fixedHeaderWidth,
    fixedHeaderHeight,
    tx,
    ty,
  ) => {
    draw.save();
    draw.attr(tableGridStyle);
    draw.translate(fixedHeaderWidth + tx, fixedHeaderHeight + ty);

    draw.clearRect(0, 0, w, h);
    if (!getOptions().showGrid) {
      draw.restore();
      return;
    }

    getData().rowEach(sri, eri, (i, y, ch) => {
      if (i !== sri) draw.line([0, y], [w, y]);
      if (i === eri) draw.line([0, y + ch], [w, y + ch]);
    });
    getData().colEach(sci, eci, (i, x, cw) => {
      if (i !== sci) draw.line([x, 0], [x, h]);
      if (i === eci) draw.line([x + cw, 0], [x + cw, h]);
    });
    draw.restore();
  };

  const renderFreezeHighlightLine = (
    fixedHeaderWidth,
    fixedHeaderHeight,
    ftw,
    fth,
  ) => {
    const twidth = getViewWidthHeight().width - fixedHeaderWidth;
    const theight = getViewWidthHeight().height - fixedHeaderHeight;
    draw.save();
    draw.translate(fixedHeaderWidth, fixedHeaderHeight);
    draw.attr({ strokeStyle: "rgba(75, 137, 255, .6)" });
    draw.line([0, fth], [twidth, fth]);
    draw.line([ftw, 0], [ftw, theight]);
    draw.restore();
  };

  const render = () => {
    // resize canvas
    const { rows, cols } = getData();
    // fixed width of getData()
    const fixedHeaderWidth = cols.indexWidth;
    // fixed height of header
    const fixedHeaderHeight = rows.indexHeight;

    draw.resize(getViewWidthHeight().width, getViewWidthHeight().height);
    clear();

    const viewRange = getData().viewRange();

    const tx = getData().freezeTotalWidth();
    const ty = getData().freezeTotalHeight();
    const { x, y } = getData().scroll;
    // 1
    renderContentGrid(viewRange, fixedHeaderWidth, fixedHeaderHeight, tx, ty);
    renderContent(viewRange, fixedHeaderWidth, fixedHeaderHeight, -x, -y);
    renderFixedHeaders(
      "all",
      viewRange,
      fixedHeaderWidth,
      fixedHeaderHeight,
      tx,
      ty,
    );
    renderFixedLeftTopCell(fixedHeaderWidth, fixedHeaderHeight);

    const [fri, fci] = getData().getFreeze();
    if (fri > 0 || fci > 0) {
      // 2
      if (fri > 0) {
        const vr = viewRange.clone();
        vr.sri = 0;
        vr.eri = fri - 1;
        vr.h = ty;
        renderContentGrid(vr, fixedHeaderWidth, fixedHeaderHeight, tx, 0);
        renderContent(vr, fixedHeaderWidth, fixedHeaderHeight, -x, 0);
        renderFixedHeaders(
          "top",
          vr,
          fixedHeaderWidth,
          fixedHeaderHeight,
          tx,
          0,
        );
      }
      // 3
      if (fci > 0) {
        const vr = viewRange.clone();
        vr.sci = 0;
        vr.eci = fci - 1;
        vr.w = tx;
        renderContentGrid(vr, fixedHeaderWidth, fixedHeaderHeight, 0, ty);
        renderFixedHeaders(
          "left",
          vr,
          fixedHeaderWidth,
          fixedHeaderHeight,
          0,
          ty,
        );
        renderContent(vr, fixedHeaderWidth, fixedHeaderHeight, 0, -y);
      }
      // 4
      const freezeViewRange = getData().freezeViewRange();
      renderContentGrid(
        freezeViewRange,
        fixedHeaderWidth,
        fixedHeaderHeight,
        0,
        0,
      );
      renderFixedHeaders(
        "all",
        freezeViewRange,
        fixedHeaderWidth,
        fixedHeaderHeight,
        0,
        0,
      );
      renderContent(freezeViewRange, fixedHeaderWidth, fixedHeaderHeight, 0, 0);
      // 5
      renderFreezeHighlightLine(fixedHeaderWidth, fixedHeaderHeight, tx, ty);
    }
  };

  const clear = () => {
    draw.clear();
  };

  const getOffset = () => {
    const { rows, cols } = getData();
    const { width, height } = getViewWidthHeight();

    return {
      width: width - cols.indexWidth,
      height: height - rows.indexHeight,
      left: getOptions().col.indexWidth,
      top: getOptions().row.indexHeight,
    };
  };

  return {
    el,
    hyperformula,
    render,
    clear,
    getOffset,
    setDraw,
  };
};
