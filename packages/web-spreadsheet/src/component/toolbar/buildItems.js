export const buildItems = (items, buttonsEl) => {
  items.forEach((it) => {
    if (Array.isArray(it)) {
      it.forEach(({ el, item }) => {
        const newEl = el ? el : item.el;

        buttonsEl.child(newEl);
      });
    } else {
      const itEl = it.el ? it.el : it.item.el;

      buttonsEl.child(itEl);
    }
  });
};
