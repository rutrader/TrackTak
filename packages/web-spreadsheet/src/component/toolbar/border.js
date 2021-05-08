import DropdownItem from "./dropdown_item";
import DropdownBorder from "../dropdown_border";

export default class Border extends DropdownItem {
  constructor(formats) {
    super(formats, "border");
  }

  dropdown() {
    return new DropdownBorder();
  }
}
