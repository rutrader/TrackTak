import { h } from "./element";
import DropdownColor, { getDropdownColor } from "./dropdown_color";
import DropdownLineType, { getDropdownLineType } from "./dropdown_linetype";
import { cssPrefix } from "../config";
import getIcon, { Icon } from "./icon";
import spreadsheetEvents from "../core/spreadsheetEvents";

function buildTable(...trs) {
  return h("table", "").child(h("tbody", "").children(...trs));
}

function buildTd(iconName) {
  return h("td", "").child(
    h("div", `${cssPrefix}-border-palette-cell`)
      .child(new Icon(`border-${iconName}`))
      .on("click", () => {
        this.mode = iconName;
        const { mode, style, color } = this;
        this.change({ mode, style, color });
      }),
  );
}

export const getBorderPalette = (tag, eventEmitter) => {
  let _color = "#000";
  let style = "thin";
  const mode = "all";
  const ddColor = getDropdownColor(tag, "line-color", _color, eventEmitter);

  eventEmitter.on(
    spreadsheetEvents.toolbar.colorPaletteChange,
    (_, bgColor) => {
      _color = bgColor;
    },
  );

  const ddType = getDropdownLineType(tag, style, eventEmitter);

  eventEmitter.on(spreadsheetEvents.toolbar.dropdownLineChange, (_, [s]) => {
    style = s;
  });

  const el = h("div", `${cssPrefix}-border-palette`);

  const buildTd = (iconName) => {
    return h("td", "").child(
      h("div", `${cssPrefix}-border-palette-cell`)
        .child(getIcon(`border-${iconName}`))
        .on("click", () => {
          const mode = iconName;

          eventEmitter.emit(
            spreadsheetEvents.toolbar.borderPaletteChange,
            tag,
            {
              mode,
              style,
              color: _color,
            },
          );
        }),
    );
  };

  const table = buildTable(
    h("tr", "").children(
      h("td", `${cssPrefix}-border-palette-left`).child(
        buildTable(
          h("tr", "").children(
            ...["all", "inside", "horizontal", "vertical", "outside"].map(
              buildTd,
            ),
          ),
          h("tr", "").children(
            ...["left", "top", "right", "bottom", "none"].map(buildTd),
          ),
        ),
      ),
      h("td", `${cssPrefix}-border-palette-right`).children(
        h("div", `${cssPrefix}-toolbar-btn`).child(ddColor.dropdown.el),
        h("div", `${cssPrefix}-toolbar-btn`).child(ddType.dropdown.el),
      ),
    ),
  );

  el.child(table);

  return {
    color: _color,
    style,
    mode,
    ddColor,
    ddType,
    el,
    table,
  };
};

export default class BorderPalette {
  constructor() {
    this.color = "#000";
    this.style = "thin";
    this.mode = "all";
    this.change = () => {};
    this.ddColor = new DropdownColor("line-color", this.color);
    this.ddColor.change = (color) => {
      this.color = color;
    };
    this.ddType = new DropdownLineType(this.style);
    this.ddType.change = ([s]) => {
      this.style = s;
    };
    this.el = h("div", `${cssPrefix}-border-palette`);
    const table = buildTable(
      h("tr", "").children(
        h("td", `${cssPrefix}-border-palette-left`).child(
          buildTable(
            h("tr", "").children(
              ...[
                "all",
                "inside",
                "horizontal",
                "vertical",
                "outside",
              ].map((it) => buildTd.call(this, it)),
            ),
            h("tr", "").children(
              ...["left", "top", "right", "bottom", "none"].map((it) =>
                buildTd.call(this, it),
              ),
            ),
          ),
        ),
        h("td", `${cssPrefix}-border-palette-right`).children(
          h("div", `${cssPrefix}-toolbar-btn`).child(this.ddColor.el),
          h("div", `${cssPrefix}-toolbar-btn`).child(this.ddType.el),
        ),
      ),
    );
    this.el.child(table);
  }
}
