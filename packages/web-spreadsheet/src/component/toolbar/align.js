import DropdownItem from "./dropdown_item";
import DropdownAlign from "../dropdown_align";
import Item from "./item";

const getAlign = (formats, value, eventEmitter) => {
  let newValue = value;
  const aligns = ["left", "center", "right"];
  const args = [formats, "align", "", value];
  const item = new Item(...args);
  const dropdownItem = new DropdownItem(...args, eventEmitter);
  const dropdownAlign = new DropdownAlign(aligns, value, eventEmitter);

  item.el.child(dropdownAlign);

  const setValue = (v) => {
    dropdownItem.setState(v);
    dropdownAlign.setTitle(v);
  };

  return {
    item,
    dropdownItem,
    dropdownAlign,
    value: newValue,
    setValue,
    dd: dropdownAlign,
    el: item.el,
    tag: dropdownItem.tag,
    tip: dropdownItem.tip,
    shortcut: dropdownItem.shortcut,
  };
};

export default getAlign;
