const MIN_CELL_X = 400;

export const setElementPosition = (el, viewFn, x, y, cellWidth) => {
  const { width } = el.show().offset();
  const view = viewFn();
  const vhf = view.height / 2;
  let left = x;
  if (view.width - x <= width && x > MIN_CELL_X) {
    const shiftCellLeftAmount = width + cellWidth;
    left -= shiftCellLeftAmount;
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
