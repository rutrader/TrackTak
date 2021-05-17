import { getDropdownAlign } from "../dropdown_align";
import { getItem } from "./item";

const getAlign = (value, eventEmitter) => {
  let newValue = value;
  const tag = "align";
  const aligns = ["left", "center", "right"];
  const item = getItem(tag);
  const dropdownAlign = getDropdownAlign(aligns, newValue, eventEmitter);

  item.el.child(dropdownAlign.dropdown.element);

  const setValue = (v) => {
    newValue = v;
    dropdownAlign.setTitle(v);
  };

  return {
    dropdownAlign,
    value: newValue,
    setValue,
    item,
  };
};

export default getAlign;
