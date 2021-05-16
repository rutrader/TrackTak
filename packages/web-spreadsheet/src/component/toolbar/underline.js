import ToggleItem from "./toggle_item";

export default class Underline extends ToggleItem {
  constructor(formats) {
    super(formats, "underline", "Ctrl+U");
  }
}
