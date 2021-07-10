export const initializeButtons = (items) => {
  const buttons = [];

  items.forEach((it) => {
    if (Array.isArray(it)) {
      it.forEach(({ el, item }) => {
        let newEl = el ? el : item.el;
        const rect = newEl.box();
        const { marginLeft, marginRight } = newEl.computedStyle();

        let width = rect.width + parseInt(marginRight, 10);

        if (!newEl.el.classList.contains("align-right")) {
          width += parseInt(marginLeft, 10);
        }

        buttons.push([newEl, width]);
      });
    } else {
      const rect = it.box();
      const { marginLeft, marginRight } = it.computedStyle();
      buttons.push([
        it,
        rect.width + parseInt(marginLeft, 10) + parseInt(marginRight, 10),
      ]);
    }
  });

  return buttons;
};
