export const moreResize = (buttons, buttonsEl, el, moreEl, widthFn) => {
  el.css("width", `${widthFn() - 60}px`);
  const elBox = el.box();

  let sumWidth = 160;
  let sumWidth2 = 12;
  const list1 = [];
  const list2 = [];
  buttons.forEach(([it, w], index) => {
    sumWidth += w;
    if (index === buttons.length - 1 || sumWidth < elBox.width) {
      list1.push(it);
    } else {
      sumWidth2 += w;
      list2.push(it);
    }
  });
  buttonsEl.html("").children(...list1);
  moreEl.dropdown.dropdown.moreBtns.html("").children(...list2);
  moreEl.dropdown.dropdown.dropdown.contentEl.css("width", `${sumWidth2}px`);
  if (list2.length > 0) {
    moreEl.show();
  } else {
    moreEl.hide();
  }
};
