import DropdownItem from "./dropdown_item";
import DropdownFont, { getDropdownFont } from "../dropdown_font";
import { getItem } from "./item";

export const getFont = (eventEmitter) => {
  let value;
  const tag = "font-name";
  const item = getItem(tag);
  const dropdownFont = getDropdownFont(tag, eventEmitter);

  item.el.child(dropdownFont.dropdown.el);

  const setValue = (v) => {
    value = v;
    dropdownFont.dropdown.setTitle(v);
  };

  return {
    item,
    value,
    dropdownFont,
    setValue,
  };
};

export default class Font extends DropdownItem {
  constructor(formats) {
    super(formats, "font-name");
  }

  getValue(it) {
    debugger;
    return it.key;
  }

  dropdown() {
    return new DropdownFont();
  }
}
