export const setElementPosition = (el, viewFn, x, y) => {
  const { width } = el.show().offset();
  const view = viewFn();
  const vhf = view.height / 2;
  let left = x;
  if (view.width - x <= width) {
    left -= width;
  }
  el.css("left", `${left}px`);
  if (y > vhf) {
    el.css("bottom", `${view.height - y}px`)
      .css("max-height", `${y}px`)
      .css("top", "auto");
  } else {
    el.css("top", `${y}px`)
      .css("max-height", `${view.height - y}px`)
      .css("bottom", "auto");
  }
};
