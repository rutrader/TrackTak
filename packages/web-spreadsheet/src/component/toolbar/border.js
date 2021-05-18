import DropdownItem from "./dropdown_item";
import makeDropdownBorder, { DropdownBorder } from "../dropdown_border";
import { getItem } from "./item";

export const getBorder = (eventEmitter) => {
  const tag = "border";
  const item = getItem(tag);
  const dropdownBorder = makeDropdownBorder(tag, eventEmitter);

  item.el.child(dropdownBorder.dropdown.el);

  return {
    item,
    dropdownBorder,
  };
};

export default class Border extends DropdownItem {
  constructor(formats) {
    super(formats, "border");
  }

  dropdown() {
    return new DropdownBorder();
  }
}
