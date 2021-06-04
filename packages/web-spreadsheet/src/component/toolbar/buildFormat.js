import { makeDropdownFormat } from "../makeDropdownFormat";
import { getDropdownItem } from "./getDropdownItem";

export const buildFormat = (getFormats, getStyles, eventEmitter) =>
  getDropdownItem(
    "format",
    makeDropdownFormat(getFormats, getStyles, eventEmitter),
  );
