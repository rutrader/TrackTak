import DropdownItem from "./dropdown_item";
import DropdownFormat, { getDropdownFormat } from "../dropdown_format";
import { getItem } from "./item";

export const getFormat = (formats, eventEmitter) => {
  let value;
  const tag = "format";
  const item = getItem(tag);
  const dropdownFont = getDropdownFormat(tag, formats, eventEmitter);

  item.el.child(dropdownFont.dropdown.el);

  const setValue = (v) => {
    value = v;
    dropdownFont.setTitle(v);
  };

  return {
    value,
    item,
    dropdownFont,
    setValue,
  };
};

export default class Format extends DropdownItem {
  constructor(formats) {
    super(formats, "format");
  }

  getValue(it) {
    return it.key;
  }

  dropdown(formats) {
    return new DropdownFormat(formats);
  }
}
