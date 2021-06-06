import { getDropdown } from "./getDropdown";
import { h } from "./element";
import { cssPrefix } from "../config";
import spreadsheetEvents from "../core/spreadsheetEvents";
import getFormatFromCell from "../shared/getFormatFromCell";

export const makeDropdownFormat = (getOptions, getData, eventEmitter) => (
  tag,
) => {
  const getFormats = () => getOptions().formats;
  let nformats = Object.values(getFormats()).slice(0);

  nformats.splice(2, 0, { key: "divider" });
  nformats.splice(8, 0, { key: "divider" });

  const setTitle = (formatKey) => {
    Object.keys(getFormats()).forEach((key) => {
      if (formatKey === key) {
        dropdown.title.html(getFormats()[key].title());
      }
    });

    dropdown.hide();
  };

  eventEmitter.on(spreadsheetEvents.sheet.cellSelected, (cell) => {
    const format = getFormatFromCell(cell, getData().getData);

    if (format) {
      setTitle(format);
    } else {
      setTitle("normal");
    }
  });

  nformats = nformats.map((it) => {
    const item = h("div", `${cssPrefix}-item`);
    if (it.key === "divider") {
      item.addClass("divider");
    } else {
      item.child(it.title()).on("click", () => {
        setTitle(it.key);

        eventEmitter.emit(spreadsheetEvents.toolbar.formatChange, tag, it);
      });
      if (it.label) {
        item.child(h("div", "label").html(it.label));
      }
    }
    return item;
  });

  const dropdown = getDropdown(
    "Normal",
    "220px",
    true,
    "bottom-left",
    ...nformats,
  );

  return {
    dropdown,
    setTitle,
  };
};
