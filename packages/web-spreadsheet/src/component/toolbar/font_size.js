import DropdownItem from "./dropdown_item";
import DropdownFontsize, { getDropdownFontSize } from "../dropdown_fontsize";
import { getItem } from "./item";

export const getFontSize = (eventEmitter) => {
  let value;
  const tag = "font-size";
  const item = getItem(tag);
  const dropdownFontSize = getDropdownFontSize(tag, eventEmitter);

  item.el.child(dropdownFontSize.dropdown.el);

  const setValue = (v) => {
    value = v;
    dropdownFontSize.dropdown.setTitle(v);
  };

  return {
    item,
    value,
    dropdownFontSize,
    setValue,
  };
};

export default class FontSize extends DropdownItem {
  constructor(formats) {
    super(formats, "font-size");
  }

  getValue(it) {
    return it.pt;
  }

  dropdown() {
    return new DropdownFontsize();
  }
}
