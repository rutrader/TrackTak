import DropdownItem from "./dropdown_item";
import DropdownFormula from "../dropdown_formula";

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
