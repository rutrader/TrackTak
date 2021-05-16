import Dropdown from "./dropdown";
import { h } from "./element";
import { cssPrefix } from "../config";
import getIcon from "./icon";

function buildItemWithIcon(iconName) {
  return h("div", `${cssPrefix}-item`).child(getIcon(iconName));
}

export default class DropdownAlign extends Dropdown {
  constructor(aligns, align, eventEmitter) {
    const icon = getIcon(`align-${align}`);
    const naligns = aligns.map((it) =>
      buildItemWithIcon(`align-${it}`).on("click", () => {
        this.setTitle(it);
        this.change(it);
        eventEmitter.emit(`align-${it}-click`, "align", it);
      }),
    );
    super(icon, "auto", true, "bottom-left", ...naligns);
  }

  setTitle(align) {
    this.title.setName(`align-${align}`);
    this.hide();
  }
}
