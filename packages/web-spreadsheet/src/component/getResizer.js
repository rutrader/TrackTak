import { h } from "./element";
import { mouseMoveUp } from "./event";
import { cssPrefix } from "../config";

export const getResizer = (
  eventEmitter,
  eventResizeType,
  getMinDistance,
  vertical = false,
) => {
  let moving = false;
  let unhideIndex;

  const unhideHoverEl = h("div", `${cssPrefix}-resizer-hover`)
    .on("dblclick.stop", (evt) => mousedblclickHandler(evt))
    .css("position", "absolute")
    .hide();
  const hoverEl = h("div", `${cssPrefix}-resizer-hover`).on(
    "mousedown.stop",
    (evt) => mousedownHandler(evt),
  );
  const lineEl = h("div", `${cssPrefix}-resizer-line`).hide();
  let el = h(
    "div",
    `${cssPrefix}-resizer ${vertical ? "vertical" : "horizontal"}`,
  )
    .children(unhideHoverEl, hoverEl, lineEl)
    .hide();

  let cRect = null;

  const showUnhide = (index) => {
    unhideIndex = index;
    unhideHoverEl.show();
  };

  const hideUnhide = () => {
    unhideHoverEl.hide();
  };

  // rect : {top, left, width, height}
  // line : {width, height}
  const show = (rect, line) => {
    if (moving) return;
    cRect = rect;
    const { left, top, width, height } = rect;
    el.offset({
      left: vertical ? left + width - 5 : left,
      top: vertical ? top : top + height - 5,
    }).show();
    hoverEl.offset({
      width: vertical ? 5 : width,
      height: vertical ? height : 5,
    });
    lineEl.offset({
      width: vertical ? 0 : line.width,
      height: vertical ? line.height : 0,
    });
    unhideHoverEl.offset({
      left: vertical ? 5 - width : left,
      top: vertical ? top : 5 - height,
      width: vertical ? 5 : width,
      height: vertical ? height : 5,
    });
  };

  const hide = () => {
    el.offset({
      left: 0,
      top: 0,
    }).hide();
    hideUnhide();
  };

  const mousedblclickHandler = () => {
    if (unhideIndex) {
      eventEmitter.emit(eventResizeType.unhide, unhideIndex);
    }
  };

  const mousedownHandler = (evt) => {
    const minDistance = getMinDistance();

    let startEvt = evt;
    let distance = vertical ? cRect.width : cRect.height;
    // console.log('distance:', distance);
    lineEl.show();
    mouseMoveUp(
      window,
      (e) => {
        moving = true;
        if (startEvt !== null && e.buttons === 1) {
          // console.log('top:', top, ', left:', top, ', cRect:', cRect);
          if (vertical) {
            distance += e.movementX;
            if (distance > minDistance) {
              el.css("left", `${cRect.left + distance}px`);
            }
          } else {
            distance += e.movementY;
            if (distance > minDistance) {
              el.css("top", `${cRect.top + distance}px`);
            }
          }
          startEvt = e;
        }
      },
      () => {
        startEvt = null;
        lineEl.hide();
        moving = false;
        hide();
        if (distance < minDistance) {
          distance = minDistance;
        }
        eventEmitter.emit(eventResizeType.finished, cRect, distance);
      },
    );
  };

  return {
    moving,
    vertical,
    el,
    cRect,
    showUnhide,
    hideUnhide,
    show,
    hide,
    mousedblclickHandler,
    mousedownHandler,
  };
};
