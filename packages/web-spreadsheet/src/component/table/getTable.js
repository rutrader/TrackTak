import { stringAt } from "../../core/alphabet";

import { thinLineWidth, npx } from "../../canvas/draw";
import { makeTable } from "./makeTable";
import { makeGetViewWidthHeight } from "../makeGetViewWidthHeight";

const tableFixedHeaderCleanStyle = { fillStyle: "#f4f5f8" };

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

export const getTable = (getOptions, getData, hyperformula, eventEmitter) => {
  const getViewWidthHeight = makeGetViewWidthHeight(getOptions);

  const renderSelectedHeaderCell = (x, y, w, h) => {
    draw.save();
    draw.attr({ fillStyle: "rgba(75, 137, 255, 0.08)" });
    draw.fillRect(x, y, w, h);
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

  const getOffset = () => {
    const { rows, cols } = getData();
    const { width, height } = getViewWidthHeight();
    return {
      width: width - cols.indexWidth,
      height: height - rows.indexHeight,
      left: cols.indexWidth,
      top: rows.indexHeight,
    };
  };

  const { clear, render, el, draw } = makeTable({
    hyperformula,
    getOptions,
    getData,
    eventEmitter,
    renderFixedHeaders,
    getViewWidthHeight,
  });

  return {
    el,
    draw,
    hyperformula,
    render,
    clear,
    getOffset,
  };
};
