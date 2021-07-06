const getClipboard = (hyperformula, getData) => {
  let range = null;
  let state = "clear";

  const getRange = () => range;
  const getState = () => state;

  const copy = (cellRange) => {
    range = cellRange;
    state = "copy";
    hyperformula.copy({
      start: {
        sheet: getData().getSheetId(),
        col: cellRange.sci,
        row: cellRange.sri,
      },
      end: {
        sheet: getData().getSheetId(),
        col: cellRange.eci,
        row: cellRange.eri,
      },
    });
  };

  const cut = (cellRange) => {
    range = cellRange;
    state = "cut";
    hyperformula.cut({
      start: {
        sheet: getData().getSheetId(),
        col: cellRange.sci,
        row: cellRange.sri,
      },
      end: {
        sheet: getData().getSheetId(),
        col: cellRange.eci,
        row: cellRange.eri,
      },
    });
  };

  const isCopy = () => {
    return state === "copy";
  };

  const isCut = () => {
    return state === "cut";
  };

  const isClear = () => {
    return state === "clear";
  };

  const clear = () => {
    range = null;
    state = "clear";
  };

  return {
    copy,
    cut,
    isCopy,
    isCut,
    isClear,
    clear,
    getRange,
    getState,
  };
};

export default getClipboard;
