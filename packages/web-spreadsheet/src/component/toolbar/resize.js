import { bind } from "../event";
import { initializeButtons } from "./initializeButtons";
import { moreResize } from "./moreResize";

export const resize = (
  isHide,
  items,
  reset,
  el,
  buttonsEl,
  moreEl,
  widthFn,
) => {
  if (isHide) {
    el.hide();
  } else {
    reset();
    setTimeout(() => {
      const buttons = initializeButtons(items);
      moreResize(buttons, buttonsEl, el, moreEl, widthFn);
    }, 0);
    bind(window, "resize", () => {
      const buttons = initializeButtons(items);
      moreResize(buttons, buttonsEl, el, moreEl, widthFn);
    });
  }
};
