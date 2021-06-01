import { h } from "./element";
import { makeDropdownColor } from "./makeDropdownColor";
import { getDropdownLineType } from "./getDropdownLineType";
import { cssPrefix } from "../config";
import getIcon from "./getIcon";
import spreadsheetEvents from "../core/spreadsheetEvents";

function buildTable(...trs) {
  return h("table", "").child(h("tbody", "").children(...trs));
}

export const getBorderPalette = (tag, eventEmitter) => {
  let _color = "#000";
  let style = "thin";
  const mode = "all";
  const ddColor = makeDropdownColor(
    () => style,
    "line-color",
    eventEmitter,
  )(tag);

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
