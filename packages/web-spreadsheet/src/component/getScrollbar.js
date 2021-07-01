import { h } from "./element";
import { cssPrefix } from "../config";
import spreadsheetEvents from "../core/spreadsheetEvents";

export const getScrollbar = (eventEmitter, vertical) => {
  const contentEl = h("div", "");
  const el = h(
    "div",
    `${cssPrefix}-scrollbar ${vertical ? "vertical" : "horizontal"}`,
  )
    .child(contentEl)
    .on("mousemove.stop", () => {})
    .on("scroll.stop", (evt) => {
      const { scrollTop, scrollLeft } = evt.target;

      eventEmitter.emit(
        vertical
          ? spreadsheetEvents.verticalScrollbar.move
          : spreadsheetEvents.horizontalScrollbar.move,
        vertical ? scrollTop : scrollLeft,
        evt,
      );
    });

  const move = (v) => {
    el.scroll(v);
  };

  const scroll = () => {
    return el.scroll();
  };

  const set = (distance, contentDistance) => {
    const d = distance - 1;
    if (contentDistance > d) {
      const cssKey = vertical ? "height" : "width";
      el.css(cssKey, `${d}px`);
      contentEl
        .css(vertical ? "width" : "height", "1px")
        .css(cssKey, `${contentDistance}px`);
    } else {
      el.hide();
    }
  };

  return {
    contentEl,
    el,
    move,
    scroll,
    set,
  };
};
