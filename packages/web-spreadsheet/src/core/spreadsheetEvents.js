import { merge } from "lodash-es";
import menuItems from "../component/menuItems";

export const saveEvents = {
  bottombar: {
    addSheet: "bb-addSheet",
    updateSheet: "bb-updateSheet",
    deleteSheet: "bb-deleteSheet",
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
  data: {
    change: "d-change",
  },
  sheet: {
    cellEdited: "s-cellEdited",
    sheetReset: "s-sheetReset",
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
    formatChange: "tb-formatChange",
    functionSet: "tb-functionSet",
  },
};

export const saveEventsArray = Object.keys(saveEvents).flatMap((key) => {
  const value = saveEvents[key];

  const eventStrings = Object.values(value).map((x) => x);

  return eventStrings;
});

const spreadsheetEvents = merge({}, saveEvents, {
  bottombar: {
    selectSheet: "bb-selectSheet",
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
  formulaBar: {
    click: "fb-click",
  },
  verticalScrollbar: {
    move: "vsb-move",
  },
  horizontalScrollbar: {
    move: "hsb-move",
  },
  sheet: {
    cellSelected: "s-cellSelected",
    cellsSelected: "s-cellsSelected",
    mouseMoveUp: "s-mouseMoveUp",
    ctrlKeyDown: "s-ctrlKeyDown",
    clickOutside: "s-clickOutside",
    switchData: "s-switchData",
    cellEdit: "s-cellEdit",
  },
  toolbar: {
    toggleItem: "tb-toggleItem",
    clickIcon: "tb-clickIcon",
  },
  save: "saveSpreadsheet",
});

export default spreadsheetEvents;
