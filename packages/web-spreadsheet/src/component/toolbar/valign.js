import { makeDropdownAlign } from "../dropdown_align";
import { getItem } from "./item";

const getVAlign = (value, eventEmitter) => {
  let newValue = value;
  const tag = "valign";
  const aligns = ["top", "middle", "bottom"];
  const item = getItem(tag);
  const dropdownAlign = makeDropdownAlign(tag, aligns, newValue, eventEmitter);

  item.el.child(dropdownAlign.dropdown.el);

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

export default getVAlign;
