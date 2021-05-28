import { makeDropdownFormat } from "../makeDropdownFormat";
import { getDropdownItem } from "./getDropdownItem";

export const buildFormat = (getFormats, eventEmitter) =>
  getDropdownItem("format", makeDropdownFormat(getFormats, eventEmitter));
