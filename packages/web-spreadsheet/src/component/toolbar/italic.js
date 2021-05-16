import ToggleItem from "./toggle_item";

export default class Italic extends ToggleItem {
  constructor(formats) {
    super(formats, "font-italic", "Ctrl+I");
  }
}
