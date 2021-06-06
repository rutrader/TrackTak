import { makeDropdownFormat } from "../makeDropdownFormat";
import { getDropdownItem } from "./getDropdownItem";

export const buildFormat = (getOptions, getData, eventEmitter) =>
  getDropdownItem(
    "format",
    makeDropdownFormat(getOptions, getData, eventEmitter),
  );
