import { getFontSizePxByPt } from "../../core/font";

import getDraw, { getDrawBox, thinLineWidth } from "../../canvas/draw";
import { h } from "../element";
import { cssPrefix } from "../../config";
import spreadsheetEvents from "../../core/spreadsheetEvents";

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

export const makeTable = ({
  getViewWidthHeight,
  getOptions,
  getData,
  hyperformula,
  eventEmitter,
  renderFixedHeaders = () => {},
}) => {
  eventEmitter.on(spreadsheetEvents.sheet.switchData, () => {
    render();
  });

  const el = h("canvas", `${cssPrefix}-table`);
  const draw = getDraw(
    el.el,
    getViewWidthHeight().width,
    getViewWidthHeight().height,
  );

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

    draw.rect(dbox, () => {
      // TODO: Fix sheets later
      const cellAddress = {
        col: cindex,
        row: rindex,
        sheet: 0,
      };

      const showAllFormulas = getOptions().showAllFormulas;
      const formats = getOptions().formats;

      // render text
      let cellText = showAllFormulas
        ? cell.text || ""
        : hyperformula.getCellValue(cellAddress);

      let format = style.format;

      if (showAllFormulas && hyperformula.doesCellHaveFormula(cellAddress)) {
        format = "text";
      }

      cellText = formats[format].render(cellText);

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

  const renderFixedLeftTopCell = (fw, fh) => {
    draw.save();
    draw.attr({ fillStyle: "#f4f5f8" });
    draw.fillRect(0, 0, fw, fh);
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

  return {
    el,
    draw,
    clear,
    render,
  };
};
