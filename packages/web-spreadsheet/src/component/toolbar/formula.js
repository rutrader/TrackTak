import DropdownItem from "./dropdown_item";
import DropdownFormula, { makeDropdownFormula } from "../dropdown_formula";
import { getItem } from "./item";

export const getFormula = (eventEmitter) => {
  let value;
  const tag = "formula";
  const item = getItem(tag);
  const dropdownFormula = makeDropdownFormula(tag, eventEmitter);

  item.el.child(dropdownFormula.dropdown.el);

  const setValue = (v) => {
    value = v;
    dropdownFormula.dropdown.setTitle(v);
  };

  return {
    item,
    value,
    dropdownFormula,
    setValue,
  };
};

export default class Formula extends DropdownItem {
  constructor(formats) {
    super(formats, "formula");
  }

  getValue(it) {
    return it;
  }

  dropdown() {
    return new DropdownFormula();
  }
}
