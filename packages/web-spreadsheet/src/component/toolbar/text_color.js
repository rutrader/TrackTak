import DropdownItem from "./dropdown_item";
import DropdownColor, { getDropdownColor } from "../dropdown_color";
import { getItem } from "./item";

export const getTextColor = (color, eventEmitter) => {
  let value = color;
  const tag = "color";
  const item = getItem(tag);
  const dropdownColor = getDropdownColor(tag, tag, value, eventEmitter);

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

export default class TextColor extends DropdownItem {
  constructor(formats, color) {
    super(formats, "color", undefined, color);
  }

  dropdown() {
    const { tag, value } = this;
    return new DropdownColor(tag, value);
  }
}
