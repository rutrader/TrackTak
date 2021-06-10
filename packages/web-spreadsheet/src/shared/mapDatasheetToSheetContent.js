const mapDatasheetToSheetContent = (dataSheet) => {
  const sheetContent = Object.values(dataSheet.rows)
    .filter((x) => typeof x === "object")
    .map(({ cells }) => {
      // TODO: Remove this when we switch all to hyperformula as a single source of truth
      const cellsKeys = Object.keys(cells);
      const lastCellKey = cellsKeys[cellsKeys.length - 1];
      const paddedCellKeys = [];

      for (let index = 0; index <= parseInt(lastCellKey, 10); index++) {
        paddedCellKeys.push(index);
      }

      return paddedCellKeys.map((key) => {
        return cells[key]?.text ?? "";
      });
    });

  return sheetContent;
};

export default mapDatasheetToSheetContent;
