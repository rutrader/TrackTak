import { menuItems } from "../component/getContextmenu";

const spreadsheetEvents = {
  bottombar: {
    addSheet: "bb-addSheet",
    selectSheet: "bb-selectSheet",
    updateSheet: "bb-updateSheet",
    deleteSheet: "bb-deleteSheet",
    clickDropdownMore: "bb-clickDropdownMore",
    clickContextMenu: "bb-clickContextMenu",
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
  editor: {
    change: "e-change",
    clear: "e-clear",
    setText: "e-setText",
  },
  formulaBar: {
    change: "fb-change",
    clear: "fb-clear",
    setText: "fb-setText",
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
    cellSelected: "s-cellSelected",
    cellsSelected: "s-cellsSelected",
    cellEdited: "s-cellEdited",
    cellEdit: "s-cellEdit",
    switchData: "s-switchData",
    sheetReset: "s-sheetReset",
    mouseMoveUp: "s-mouseMoveUp",
    ctrlKeyDown: "s-ctrlKeyDown",
    addData: "s-addData",
    deleteData: "s-deleteData",
    setDatasheets: "s-setDatasheets",
  },
  toolbar: {
    alignChange: "tb-alignChange",
    dropdownLineChange: "tb-dropdownLineChange",
    borderPaletteChange: "tb-borderPaletteChange",
    colorPaletteChange: "tb-colorPaletteChange",
    fontChange: "tb-fontChange",
    fontSizeChange: "tb-fontSizeChange",
    toggleItem: "tb-toggleItem",
    clickIcon: "tb-clickIcon",
    formatChange: "tb-formatChange",
    formulaSet: "tb-formulaSet",
  },
};

export default spreadsheetEvents;
