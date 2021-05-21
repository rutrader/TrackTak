export const buildItems = (items, buttonsEl) => {
  items.forEach((it) => {
    if (Array.isArray(it)) {
      it.forEach((i) => {
        const iEl = i.el ? i.el : i.item.el;

        buttonsEl.child(iEl);
      });
    } else {
      const itEl = it.el ? it.el : it.item.el;

      buttonsEl.child(itEl);
    }
  });
};
