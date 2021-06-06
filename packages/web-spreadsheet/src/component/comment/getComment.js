import { cssPrefix } from "../../config";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { tf } from "../../locale/locale";
import { setElementPosition } from "../../shared/setElementPosition";
import { h } from "../element";
import { unbindClickoutside } from "../event";
import { bindClickoutside } from "../event";

export const getComment = (
  overlayerEl,
  getData,
  viewFn,
  contextMenuEl,
  eventEmitter,
) => {
  const el = h("textarea", `${cssPrefix}-comment`).hide();

  el.el.placeholder = tf("comment.placeholder")();

  const show = (cancelHide) => {
    const rect = getData().getSelectedRect();
    const indexWith = getData().cols.indexWidth;
    const indexHeight = getData().rows.indexHeight;
    const comment = getData().getSelectedCell().comment;

    el.val(comment);

    setElementPosition(
      overlayerEl,
      el,
      viewFn,
      rect.left + rect.width + indexWith,
      rect.top + indexHeight,
      rect,
    );

    bindClickoutside(
      el,
      () => {
        if (!cancelHide) {
          el.val("");
          hide();
        }
      },
      [el, contextMenuEl],
    );
  };

  const hide = () => {
    el.hide();

    unbindClickoutside(el);
  };

  eventEmitter.on(spreadsheetEvents.sheet.cellSelected, (cell) => {
    const comment = cell?.comment;

    if (comment) {
      show(true);
    } else {
      hide();
    }
  });

  return {
    el,
    hide,
    show,
  };
};
