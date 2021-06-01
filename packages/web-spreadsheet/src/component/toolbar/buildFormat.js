import { makeDropdownFormat } from "../makeDropdownFormat";
import { getDropdownItem } from "./getDropdownItem";

export const buildFormat = (getFormats, eventEmitter, toolbarType) =>
  getDropdownItem(
    "format",
    makeDropdownFormat(getFormats, eventEmitter, toolbarType),
  );
