import DropdownItem from "./dropdown_item";
import DropdownFontsize from "../dropdown_fontsize";

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
