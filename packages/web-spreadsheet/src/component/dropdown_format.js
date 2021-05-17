import Dropdown, { getDropdown } from "./dropdown";
import { h } from "./element";
import { cssPrefix } from "../config";
import spreadsheetEvents from "../core/spreadsheetEvents";

export const getDropdownFormat = (tag, formats, eventEmitter) => {
  let nformats = Object.values(formats).slice(0);

  nformats.splice(2, 0, { key: "divider" });
  nformats.splice(8, 0, { key: "divider" });

  const setTitle = (formatKey) => {
    Object.keys(formats).forEach((key) => {
      if (formatKey === key) {
        dropdown.title.html(formats[key].title());
      }
    });

    dropdown.hide();
  };

  nformats = nformats.map((it) => {
    const item = h("div", `${cssPrefix}-item`);
    if (it.key === "divider") {
      item.addClass("divider");
    } else {
      item.child(it.title()).on("click", () => {
        setTitle(it.title());

        eventEmitter.emit(
          spreadsheetEvents.toolbar.formatChange,
          tag,
          it.title().toLowerCase(),
        );
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
    formats,
    setTitle,
  };
};

export default class DropdownFormat extends Dropdown {
  constructor(formats) {
    let nformats = Object.values(formats).slice(0);
    nformats.splice(2, 0, { key: "divider" });
    nformats.splice(8, 0, { key: "divider" });
    nformats = nformats.map((it) => {
      const item = h("div", `${cssPrefix}-item`);
      if (it.key === "divider") {
        item.addClass("divider");
      } else {
        item.child(it.title()).on("click", () => {
          this.setTitle(it.title());
          this.change(it);
        });
        if (it.label) item.child(h("div", "label").html(it.label));
      }
      return item;
    });
    super("Normal", "220px", true, "bottom-left", ...nformats);

    this.formats = formats;
  }

  setTitle(formatKey) {
    Object.keys(this.formats).forEach((key) => {
      if (formatKey === key) {
        this.title.html(this.formats[key].title());
      }
    });

    this.hide();
  }
}
