import ToggleItem from "./toggle_item";

export default class Strike extends ToggleItem {
  constructor(formats) {
    super(formats, "strike", "Ctrl+U");
  }
}
