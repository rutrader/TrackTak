import Dropdown, { getDropdown } from "./dropdown";
import { h } from "./element";
import { cssPrefix } from "../config";
import getIcon from "./icon";

function buildItemWithIcon(iconName) {
  return h("div", `${cssPrefix}-item`).child(getIcon(iconName));
}

export const getDropdownAlign = (tag, aligns, align, eventEmitter) => {
  const icon = getIcon(`align-${align}`);
  const naligns = aligns.map((it) => {
    const name = `align-${it}`;

    return buildItemWithIcon(name).on("click", () => {
      eventEmitter.emit(`${name}-click`, tag, it);
    });
  });

  const dropdown = getDropdown(icon, "auto", true, "bottom-left", ...naligns);

  const setTitle = (align) => {
    icon.setName(`align-${align}`);
    dropdown.hide();
  };

  return {
    dropdown,
    setTitle,
  };
};

export default class DropdownAlign extends Dropdown {
  constructor(aligns, align) {
    const icon = getIcon(`align-${align}`);
    const naligns = aligns.map((it) =>
      buildItemWithIcon(`align-${it}`).on("click", () => {
        this.setTitle(it);
        this.change(it);
      }),
    );
    super(icon, "auto", true, "bottom-left", ...naligns);
  }

  setTitle(align) {
    this.title.setName(`align-${align}`);
    this.hide();
  }
}
