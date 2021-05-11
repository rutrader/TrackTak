import DropdownItem from "./dropdown_item";
import DropdownFormat from "../dropdown_format";

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
