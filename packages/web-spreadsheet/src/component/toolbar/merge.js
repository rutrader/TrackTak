import ToggleItem from "./toggle_item";

export default class Merge extends ToggleItem {
  constructor(formats) {
    super(formats, "merge");
  }

  setState(active, disabled) {
    this.el.active(active).disabled(disabled);
  }
}
