import { getItem } from "./item";

export const getDropdownItem = (tag, makeDropdown) => {
  const item = getItem(tag);
  const dropdown = makeDropdown(tag);

  item.el.child(dropdown.dropdown.el);

  return {
    item,
    dropdown,
  };
};
