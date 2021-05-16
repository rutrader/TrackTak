import Item from "./item";
import getIcon from "../icon";

export default class IconItem extends Item {
  element() {
    return super
      .element()
      .child(getIcon(this.tag))
      .on("click", () => this.change(this.tag));
  }

  setState(disabled) {
    this.el.disabled(disabled);
  }
}
