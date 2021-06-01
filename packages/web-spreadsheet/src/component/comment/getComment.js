import { cssPrefix } from "../../config";
import { tf } from "../../locale/locale";
import { setElementPosition } from "../../shared/setElementPosition";
import { h } from "../element";
import { unbindClickoutside } from "../event";
import { bindClickoutside } from "../event";

export const getComment = (getData, viewFn, contextMenuEl, eventEmitter) => {
  const el = h("textarea", `${cssPrefix}-comment`).hide();

  el.el.placeholder = tf("comment.placeholder")();

  const show = () => {
    const rect = getData().getSelectedRect();
    const indexWith = getData().cols.indexWidth;
    const indexHeight = getData().rows.indexHeight;

    setElementPosition(
      el,
      viewFn,
      rect.left + rect.width + indexWith,
      rect.top + indexHeight,
    );

    bindClickoutside(el, null, [el, contextMenuEl]);
  };

  const hide = () => {
    el.hide();

    unbindClickoutside(el);
  };

  return {
    el,
    hide,
    show,
  };
};
