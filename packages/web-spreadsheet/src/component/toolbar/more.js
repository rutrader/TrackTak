import { getDropdown } from "../getDropdown";

import { cssPrefix } from "../../config";
import { h } from "../element";
import getIcon from "../getIcon";
import { getDropdownItem } from "./getDropdownItem";

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
  const dropdown = getDropdownItem(tag, getDropdownMore);

  const show = () => {
    dropdown.item.el.show();
  };

  const hide = () => {
    dropdown.item.el.hide();
  };

  hide();

  return {
    dropdown,
    item: dropdown.item,
    hide,
    show,
  };
};
