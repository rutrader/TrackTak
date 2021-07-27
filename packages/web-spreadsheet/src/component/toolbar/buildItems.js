export const buildItems = (items) => {
  return items.flatMap((it) => {
    if (Array.isArray(it)) {
      return it.map(({ el, item }) => {
        const newEl = el ? el : item.el.el;

        return newEl;
      });
    } else {
      const itEl = it.el ? it.el : it.item.el.el;

      return itEl;
    }
  });
};
