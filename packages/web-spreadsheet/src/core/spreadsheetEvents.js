import menuItems from "../component/menuItems";

const spreadsheetEvents = {
  editor: {
    change: "e-change",
    clear: "e-clear",
    setText: "e-setText",
  },
  formulaBar: {
    change: "fb-change",
    clear: "fb-clear",
    setText: "fb-setText",
    click: "fb-click",
  },
  rowResizer: {
    finished: "rr-finished",
    unhide: "rr-unhide",
  },
  colResizer: {
    finished: "cr-finished",
    unhide: "cr-unhide",
  },
  sheet: {
    cellEdited: "s-cellEdited",
    sheetReset: "s-sheetReset",
    addData: "s-addData",
    deleteData: "s-deleteData",
    setDatasheets: "s-setDatasheets",
    cellSelected: "s-cellSelected",
    cellsSelected: "s-cellsSelected",
    mouseMoveUp: "s-mouseMoveUp",
    ctrlKeyDown: "s-ctrlKeyDown",
    clickOutside: "s-clickOutside",
    switchData: "s-switchData",
    cellEdit: "s-cellEdit",
  },
  toolbar: {
    alignChange: "tb-alignChange",
    dropdownLineChange: "tb-dropdownLineChange",
    borderPaletteChange: "tb-borderPaletteChange",
    colorPaletteChange: "tb-colorPaletteChange",
    fontChange: "tb-fontChange",
    fontSizeChange: "tb-fontSizeChange",
    formatChange: "tb-formatChange",
    functionSet: "tb-functionSet",
    toggleItem: "tb-toggleItem",
    clickIcon: "tb-clickIcon",
  },
  bottombar: {
    selectSheet: "bb-selectSheet",
    clickDropdownMore: "bb-clickDropdownMore",
    clickContextMenu: "bb-clickContextMenu",
    addSheet: "bb-addSheet",
    updateSheet: "bb-updateSheet",
    deleteSheet: "bb-deleteSheet",
  },
  rightClickMenu: {
    ...menuItems.reduce((prev, curr) => {
      if (curr.key === "divider") {
        return prev;
      }

      return {
        ...prev,
        [curr.key]: `rcm-${curr.key}`,
      };
    }, {}),
  },
  verticalScrollbar: {
    move: "vsb-move",
  },
  horizontalScrollbar: {
    move: "hsb-move",
  },
  export: {
    exportSheets: "e-export-sheets",
  },
  save: {
    persistDataChange: "s-persist-data-change",
  },
};

export default spreadsheetEvents;
