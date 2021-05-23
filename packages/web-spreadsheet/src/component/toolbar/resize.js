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
  const buttons = initializeButtons(items);

  if (isHide) {
    el.hide();
  } else {
    const resizer = () => {
      moreResize(buttons, buttonsEl, el, moreEl, widthFn);
    };
    reset();
    resizer();
    bind(window, "resize", resizer);
  }
};
