export const setElementPosition = (overlayerEl, el, viewFn, x, y, cellRect) => {
  const { width } = el.show().offset();
  const view = viewFn();
  const vhf = view.height / 2;
  let newLeft = x;
  if (view.width - x <= width) {
    const shiftCellLeftAmount = width + cellRect?.width ?? 0;
    newLeft -= shiftCellLeftAmount;
  }
  y = cellRect?.top;
  if (newLeft <= overlayerEl.el.offsetLeft) {
    newLeft = overlayerEl.el.offsetLeft;
    y += cellRect?.height * 2;
  }
  el.css("left", `${newLeft}px`);
  el.css("top", `${y}px`);
  if (y > vhf) {
    el.css("bottom", `${view.height - y}px`).css("max-height", `${y}px`);
  } else {
    el.css("max-height", `${view.height - y}px`).css("bottom", "auto");
  }
};
