import ToggleItem from "./toggle_item";

export default class Bold extends ToggleItem {
  constructor(formats) {
    super(formats, "font-bold", "Ctrl+B");
  }
}
