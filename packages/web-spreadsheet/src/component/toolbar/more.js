import Dropdown, { getDropdown } from "../dropdown";
import DropdownItem from "./dropdown_item";

import { cssPrefix } from "../../config";
import { h } from "../element";
import getIcon from "../icon";
import { getItem } from "./item";

const getDropdownMore = () => {
  const icon = getIcon("ellipsis");
  const moreBtns = h("div", `${cssPrefix}-toolbar-more`);
  const dropdown = getDropdown(icon, "auto", false, "bottom-right", moreBtns);

  dropdown.contentEl.css("max-width", "420px");

  return {
    moreBtns,
    dropdown,
  };
};

export const getMore = () => {
  const tag = "more";
  const item = getItem(tag);
  const dropdownMore = getDropdownMore();

  item.el.child(dropdownMore.dropdown.el);

  const show = () => {
    item.el.show();
  };

  const hide = () => {
    item.el.hide();
  };

  hide();

  return {
    dropdownMore,
    item,
    hide,
    show,
  };
};

class DropdownMore extends Dropdown {
  constructor() {
    const icon = getIcon("ellipsis");
    const moreBtns = h("div", `${cssPrefix}-toolbar-more`);
    super(icon, "auto", false, "bottom-right", moreBtns);
    this.moreBtns = moreBtns;
    this.contentEl.css("max-width", "420px");
  }
}

export default class More extends DropdownItem {
  constructor(formats) {
    super(formats, "more");
    this.el.hide();
  }

  dropdown() {
    return new DropdownMore();
  }

  show() {
    this.el.show();
  }

  hide() {
    this.el.hide();
  }
}
