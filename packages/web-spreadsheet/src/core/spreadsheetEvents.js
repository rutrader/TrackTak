const spreadsheetEvents = {
  bottombar: {
    addSheet: "bb-add-sheet",
    selectSheet: "bb-select-sheet",
    updateSheet: "bb-update-sheet",
    clickDropdownMore: "bb-click-dropdown-more",
    clickContextMenu: "bb-click-context-menu",
  },
  rightClickMenu: {
    clickContextMenu: "rcm-click-context-menu",
  },
  editor: {
    change: "e-change",
  },
  rowResizer: {
    finished: "rr-finished",
    unhide: "rr-unhide",
  },
  colResizer: {
    finished: "cr-finished",
    unhide: "cr-unhide",
  },
  verticalScrollbar: {
    move: "vsb-move",
  },
  horizontalScrollbar: {
    move: "hsb-move",
  },
  data: {
    change: "d-change",
  },
  sheet: {
    cellSelected: "s-cell-selected",
    cellsSelected: "s-cells-selected",
    cellEditedFinished: "s-cell-edited-finished",
    cellEdited: "s-cell-edited",
    resetData: "s-reset-data",
    sheetReset: "s-sheet-reset",
    mouseMoveUp: "s-mouse-move-up",
    ctrlKeyDown: "s-ctrl-key-down",
  },
  toolbar: {
    alignChange: "tb-align-change",
    dropdownLineChange: "tb-dropdown-line-change",
    borderPaletteChange: "tb-border-palette-change",
    colorPaletteChange: "tb-color-palette-change",
    fontChange: "tb-font-change",
    fontSizeChange: "tb-font-size-change",
    toggleItem: "tb-toggle-item",
    clickIcon: "tb-click-icon",
    formatChange: "tb-format-change",
    formulaSet: "tb-formula-set",
  },
};

export default spreadsheetEvents;
