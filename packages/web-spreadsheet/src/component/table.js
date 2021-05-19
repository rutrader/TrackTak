import { stringAt } from "../core/alphabet";
import { getFontSizePxByPt } from "../core/font";

import getDraw, { getDrawBox, thinLineWidth, npx } from "../canvas/draw";

const cellPaddingWidth = 5;
const tableFixedHeaderCleanStyle = { fillStyle: "#f4f5f8" };
const tableGridStyle = {
  fillStyle: "#fff",
  lineWidth: thinLineWidth,
  strokeStyle: "#e6e6e6",
};
function tableFixedHeaderStyle() {
  return {
    textAlign: "center",
    textBaseline: "middle",
    font: `500 ${npx(12)}px Source Sans Pro`,
    fillStyle: "#585757",
    lineWidth: thinLineWidth(),
    strokeStyle: "#e6e6e6",
  };
}

function getTableDrawBox(data, rindex, cindex, yoffset = 0) {
  const { left, top, width, height } = data.cellRect(rindex, cindex);
  return getDrawBox(left, top + yoffset, width, height, cellPaddingWidth);
}

export const getTable = (el, data, hyperFormula, formats) => {
  const draw = getDraw(el, data.viewWidth(), data.viewHeight());
  let calculateFormulas = true;

  const setCalculateFormulas = (shouldCalculateFormulas) => {
    calculateFormulas = shouldCalculateFormulas;
  };

  function renderCell(draw, data, rindex, cindex, yoffset = 0) {
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

    draw.rect(dbox, () => {
      // TODO: Fix sheets later
      const cellAddress = {
        col: cindex,
        row: rindex,
        sheet: 0,
      };

      // render text
      let cellText = calculateFormulas
        ? hyperFormula.getCellValue(cellAddress)
        : cell.text || "";
      let format = style.format;

      if (!calculateFormulas && hyperFormula.doesCellHaveFormula(cellAddress)) {
        format = "text";
      }

      if (format) {
        cellText = formats[format].render(cellText);
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
    });
  }

  function renderAutofilter(viewRange) {
    if (viewRange) {
      const { autoFilter } = data;
      if (!autoFilter.active()) return;
      const afRange = autoFilter.hrange();
      if (viewRange.intersects(afRange)) {
        afRange.each((ri, ci) => {
          const dbox = getTableDrawBox(data, ri, ci);
          draw.dropdown(dbox);
        });
      }
    }
  }

  function renderContent(viewRange, fw, fh, tx, ty) {
    draw.save();
    draw.translate(fw, fh);
    draw.translate(tx, ty);

    const { exceptRowSet } = data;
    // const exceptRows = Array.from(exceptRowSet);
    const filteredTranslateFunc = (ri) => {
      const ret = exceptRowSet.has(ri);
      if (ret) {
        const height = data.rows.getHeight(ri);
        draw.translate(0, -height);
      }
      return !ret;
    };

    const exceptRowTotalHeight = data.exceptRowTotalHeight(
      viewRange.sri,
      viewRange.eri,
    );
    // 1 render cell
    draw.save();
    draw.translate(0, -exceptRowTotalHeight);
    viewRange.each(
      (ri, ci) => {
        renderCell(draw, data, ri, ci);
      },
      (ri) => filteredTranslateFunc(ri),
    );
    draw.restore();

    // 2 render mergeCell
    const rset = new Set();
    draw.save();
    draw.translate(0, -exceptRowTotalHeight);
    data.eachMergesInView(viewRange, ({ sri, sci, eri }) => {
      if (!exceptRowSet.has(sri)) {
        renderCell(draw, data, sri, sci);
      } else if (!rset.has(sri)) {
        rset.add(sri);
        const height = data.rows.sumHeight(sri, eri + 1);
        draw.translate(0, -height);
      }
    });
    draw.restore();

    // 3 render autofilter
    renderAutofilter(viewRange);

    draw.restore();
  }

  function renderSelectedHeaderCell(x, y, w, h) {
    draw.save();
    draw.attr({ fillStyle: "rgba(75, 137, 255, 0.08)" });
    draw.fillRect(x, y, w, h);
    draw.restore();
  }

  // viewRange
  // type: all | left | top
  // w: the fixed width of header
  // h: the fixed height of header
  // tx: moving distance on x-axis
  // ty: moving distance on y-axis
  function renderFixedHeaders(type, viewRange, w, h, tx, ty) {
    const sumHeight = viewRange.h; // rows.sumHeight(viewRange.sri, viewRange.eri + 1);
    const sumWidth = viewRange.w; // cols.sumWidth(viewRange.sci, viewRange.eci + 1);
    const nty = ty + h;
    const ntx = tx + w;

    draw.save();
    // draw rect background
    draw.attr(tableFixedHeaderCleanStyle);
    if (type === "all" || type === "left") draw.fillRect(0, nty, w, sumHeight);
    if (type === "all" || type === "top") draw.fillRect(ntx, 0, sumWidth, h);

    const { sri, sci, eri, eci } = data.selector.range;
    // console.log(data.selectIndexes);
    // draw text
    // text font, align...
    draw.attr(tableFixedHeaderStyle());
    // y-header-text
    if (type === "all" || type === "left") {
      data.rowEach(viewRange.sri, viewRange.eri, (i, y1, rowHeight) => {
        const y = nty + y1;
        const ii = i;
        draw.line([0, y], [w, y]);
        if (sri <= ii && ii < eri + 1) {
          renderSelectedHeaderCell(0, y, w, rowHeight);
        }
        draw.fillText(ii + 1, w / 2, y + rowHeight / 2);
        if (i > 0 && data.rows.isHide(i - 1)) {
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
      data.colEach(viewRange.sci, viewRange.eci, (i, x1, colWidth) => {
        const x = ntx + x1;
        const ii = i;
        draw.line([x, 0], [x, h]);
        if (sci <= ii && ii < eci + 1) {
          renderSelectedHeaderCell(x, 0, colWidth, h);
        }
        draw.fillText(stringAt(ii), x + colWidth / 2, h / 2);
        if (i > 0 && data.cols.isHide(i - 1)) {
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
  }

  function renderFixedLeftTopCell(fw, fh) {
    draw.save();
    draw.attr({ fillStyle: "#f4f5f8" });
    draw.fillRect(0, 0, fw, fh);
    draw.restore();
  }

  function renderContentGrid({ sri, sci, eri, eci, w, h }, fw, fh, tx, ty) {
    const { options } = data;

    draw.save();
    draw.attr(tableGridStyle);
    draw.translate(fw + tx, fh + ty);

    draw.clearRect(0, 0, w, h);
    if (!options.showGrid) {
      draw.restore();
      return;
    }

    data.rowEach(sri, eri, (i, y, ch) => {
      if (i !== sri) draw.line([0, y], [w, y]);
      if (i === eri) draw.line([0, y + ch], [w, y + ch]);
    });
    data.colEach(sci, eci, (i, x, cw) => {
      if (i !== sci) draw.line([x, 0], [x, h]);
      if (i === eci) draw.line([x + cw, 0], [x + cw, h]);
    });
    draw.restore();
  }

  function renderFreezeHighlightLine(fw, fh, ftw, fth) {
    const twidth = data.viewWidth() - fw;
    const theight = data.viewHeight() - fh;
    draw.save();
    draw.translate(fw, fh);
    draw.attr({ strokeStyle: "rgba(75, 137, 255, .6)" });
    draw.line([0, fth], [twidth, fth]);
    draw.line([ftw, 0], [ftw, theight]);
    draw.restore();
  }

  const resetData = (datum) => {
    data = datum;
    render();
  };

  const render = () => {
    // resize canvas
    const { rows, cols } = data;
    // fixed width of header
    const fw = cols.indexWidth;
    // fixed height of header
    const fh = rows.height;

    draw.resize(data.viewWidth(), data.viewHeight());
    clear();

    const viewRange = data.viewRange();

    const tx = data.freezeTotalWidth();
    const ty = data.freezeTotalHeight();
    const { x, y } = data.scroll;
    // 1
    renderContentGrid(viewRange, fw, fh, tx, ty);
    renderContent(viewRange, fw, fh, -x, -y);
    renderFixedHeaders("all", viewRange, fw, fh, tx, ty);
    renderFixedLeftTopCell(fw, fh);

    const [fri, fci] = data.getFreeze();
    if (fri > 0 || fci > 0) {
      // 2
      if (fri > 0) {
        const vr = viewRange.clone();
        vr.sri = 0;
        vr.eri = fri - 1;
        vr.h = ty;
        renderContentGrid(vr, fw, fh, tx, 0);
        renderContent(vr, fw, fh, -x, 0);
        renderFixedHeaders("top", vr, fw, fh, tx, 0);
      }
      // 3
      if (fci > 0) {
        const vr = viewRange.clone();
        vr.sci = 0;
        vr.eci = fci - 1;
        vr.w = tx;
        renderContentGrid(vr, fw, fh, 0, ty);
        renderFixedHeaders("left", vr, fw, fh, 0, ty);
        renderContent(vr, fw, fh, 0, -y);
      }
      // 4
      const freezeViewRange = data.freezeViewRange();
      renderContentGrid(freezeViewRange, fw, fh, 0, 0);
      renderFixedHeaders("all", freezeViewRange, fw, fh, 0, 0);
      renderContent(freezeViewRange, fw, fh, 0, 0);
      // 5
      renderFreezeHighlightLine(fw, fh, tx, ty);
    }
  };

  const clear = () => {
    draw.clear();
  };

  return {
    el,
    draw,
    data,
    hyperFormula,
    formats,
    resetData,
    render,
    clear,
    setCalculateFormulas,
  };
};
