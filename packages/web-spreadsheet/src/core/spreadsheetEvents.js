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
    change: "e_change",
  },
  rowResizer: {
    finished: "rr_finished",
    unhide: "rr_unhide",
  },
  colResizer: {
    finished: "cr_finished",
    unhide: "cr_unhide",
  },
  verticalScrollbar: {
    move: "vsb_move",
  },
  horizontalScrollbar: {
    move: "hsb_move",
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
