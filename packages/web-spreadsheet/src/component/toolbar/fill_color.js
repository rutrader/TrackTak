import DropdownItem from "./dropdown_item";
import DropdownColor, { makeDropdownColor } from "../dropdown_color";
import { getItem } from "./item";

export const getFillColor = (color, eventEmitter) => {
  let value = color;
  const tag = "bgcolor";
  const item = getItem(tag);
  const dropdownColor = makeDropdownColor(tag, tag, value, eventEmitter);

  item.el.child(dropdownColor.dropdown.el);

  const setValue = (c) => {
    dropdownColor.setTitle(c);
    value = c;
  };

  return {
    value,
    item,
    dropdownColor,
    setValue,
  };
};

export default class FillColor extends DropdownItem {
  constructor(formats, color) {
    super(formats, "bgcolor", undefined, color);
  }

  dropdown() {
    const { tag, value } = this;
    return new DropdownColor(tag, value);
  }
}
