import { makeDropdownFormat } from "../makeDropdownFormat";
import { getDropdownItem } from "./getDropdownItem";

export const buildFormat = (formats, eventEmitter, toolbarType) =>
  getDropdownItem(
    "format",
    makeDropdownFormat(formats, eventEmitter, toolbarType),
  );
