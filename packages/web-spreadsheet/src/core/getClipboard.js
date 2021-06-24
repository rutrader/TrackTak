import convertIndexesToAmount from "../shared/convertIndexesToAmount";

const getClipboard = (hyperformula, getData) => {
  let range = null;
  let state = "clear";

  const getRange = () => range;
  const getState = () => state;

  const copy = (cellRange) => {
    range = cellRange;
    state = "copy";
    hyperformula.copy(
      {
        sheet: getData().getSheetId(),
        col: cellRange.sci,
        row: cellRange.sri,
      },
      convertIndexesToAmount(cellRange.sci, cellRange.eci),
      convertIndexesToAmount(cellRange.sri, cellRange.eri),
    );
  };

  const cut = (cellRange) => {
    range = cellRange;
    state = "cut";
    hyperformula.cut(
      {
        sheet: getData().getSheetId(),
        col: cellRange.sci,
        row: cellRange.sri,
      },
      convertIndexesToAmount(cellRange.sci, cellRange.eci),
      convertIndexesToAmount(cellRange.sri, cellRange.eri),
    );
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
