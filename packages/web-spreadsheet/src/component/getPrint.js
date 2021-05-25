import { h } from "./element";
import { cssPrefix } from "../config";
import getDraw from "../canvas/draw";
// import { renderCell } from "./table";
import { t } from "../locale/locale";
import getButton from "./button";

// resolution: 72 => 595 x 842
// 150 => 1240 x 1754
// 200 => 1654 x 2339
// 300 => 2479 x 3508
// 96 * cm / 2.54 , 96 * cm / 2.54

const PAGER_SIZES = [
  ["A3", 11.69, 16.54],
  ["A4", 8.27, 11.69],
  ["A5", 5.83, 8.27],
  ["B4", 9.84, 13.9],
  ["B5", 6.93, 9.84],
];

const PAGER_ORIENTATIONS = ["landscape", "portrait"];

function inches2px(inc) {
  return parseInt(96 * inc, 10);
}

export const getPrint = (rootEl, getData) => {
  const paper = {
    w: inches2px(PAGER_SIZES[0][1]),
    h: inches2px(PAGER_SIZES[0][2]),
    padding: 50,
    orientation: PAGER_ORIENTATIONS[0],
    get width() {
      return this.orientation === "landscape" ? h : this.w;
    },
    get height() {
      return this.orientation === "landscape" ? this.w : h;
    },
  };
  let canvases = [];
  const contentEl = h("div", "-content");

  const el = h("div", `${cssPrefix}-print`)
    .children(
      h("div", `${cssPrefix}-print-bar`).children(
        h("div", "-title").child("Print settings"),
        h("div", "-right").children(
          h("div", `${cssPrefix}-buttons`).children(
            getButton("cancel").el.on("click", () => btnClick("cancel")),
            getButton("next", "primary").el.on("click", () => btnClick("next")),
          ),
        ),
      ),
      h("div", `${cssPrefix}-print-content`).children(
        contentEl,
        h("div", "-sider").child(
          h("form", "").children(
            h("fieldset", "").children(
              h("label", "").child(`${t("print.size")}`),
              h("select", "")
                .children(
                  ...PAGER_SIZES.map((it, index) =>
                    h("option", "")
                      .attr("value", index)
                      .child(`${it[0]} ( ${it[1]}''x${it[2]}'' )`),
                  ),
                )
                .on("change", pagerSizeChange),
            ),
            h("fieldset", "").children(
              h("label", "").child(`${t("print.orientation")}`),
              h("select", "")
                .children(
                  ...PAGER_ORIENTATIONS.map((it, index) =>
                    h("option", "")
                      .attr("value", index)
                      .child(`${t("print.orientations")[index]}`),
                  ),
                )
                .on("change", pagerOrientationChange),
            ),
          ),
        ),
      ),
    )
    .hide();

  rootEl.children(el);

  function btnClick(type) {
    if (type === "cancel") {
      el.hide();
    } else {
      toPrint();
    }
  }

  function pagerSizeChange(evt) {
    const { value } = evt.target;
    const ps = PAGER_SIZES[value];
    paper.w = inches2px(ps[1]);
    paper.h = inches2px(ps[2]);
    // console.log('paper:', ps, paper);
    preview();
  }

  function pagerOrientationChange(evt) {
    const { value } = evt.target;
    const v = PAGER_ORIENTATIONS[value];
    paper.orientation = v;
    preview();
  }

  const preview = () => {
    const { width, height, padding } = paper;
    const iwidth = width - padding * 2;
    const iheight = height - padding * 2;
    const cr = getData().contentRange();
    const pages = parseInt(cr.h / iheight, 10) + 1;
    const scale = iwidth / cr.w;
    let left = padding;
    const top = padding;
    if (scale > 1) {
      left += (iwidth - cr.w) / 2;
    }
    let ri = 0;

    contentEl.html("");
    canvases = [];
    const mViewRange = {
      sri: 0,
      sci: 0,
      eri: 0,
      eci: 0,
    };
    for (let i = 0; i < pages; i += 1) {
      let th = 0;
      const wrap = h("div", `${cssPrefix}-canvas-card`);
      const canvas = h("canvas", `${cssPrefix}-canvas`);
      canvases.push(canvas.el);
      const draw = getDraw(canvas.el, width, height);
      // cell-content
      draw.save();
      draw.translate(left, top);
      if (scale < 1) draw.scale(scale, scale);

      for (; ri <= cr.eri; ri += 1) {
        const rh = getData().rows.getHeight(ri);
        th += rh;
        if (th < iheight) {
          for (let ci = 0; ci <= cr.eci; ci += 1) {
            mViewRange.eci = ci;
          }
        } else {
          break;
        }
      }
      mViewRange.eri = ri;
      draw.restore();
      // merge-cell
      draw.save();
      draw.translate(left, top);
      if (scale < 1) draw.scale(scale, scale);

      draw.restore();

      mViewRange.sri = mViewRange.eri;
      mViewRange.sci = mViewRange.eci;

      contentEl.child(
        h("div", `${cssPrefix}-canvas-card-wraper`).child(wrap.child(canvas)),
      );
    }
    el.show();
  };

  const toPrint = () => {
    el.hide();
    const iframe = h("iframe", "").hide();
    const { el: iframeEl } = iframe;
    window.document.body.appendChild(iframeEl);
    const { contentWindow } = iframeEl;
    const idoc = contentWindow.document;
    const style = document.createElement("style");
    style.innerHTML = `
      @page { size: ${paper.width}px ${paper.height}px; };
      canvas {
        page-break-before: auto;
        page-break-after: always;
        image-rendering: pixelated;
      };
    `;
    idoc.head.appendChild(style);
    canvases.forEach((it) => {
      const cn = it.cloneNode(false);
      const ctx = cn.getContext("2d");
      // ctx.imageSmoothingEnabled = true;
      ctx.drawImage(it, 0, 0);
      idoc.body.appendChild(cn);
    });
    contentWindow.print();
  };

  return {
    paper,
    el,
    preview,
    toPrint,
  };
};
