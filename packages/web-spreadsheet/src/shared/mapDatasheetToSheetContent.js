const mapDatasheetToSheetContent = (dataSheet) => {
  const sheetContent = Object.values(dataSheet.rows)
    .filter((x) => Array.isArray(x?.cells))
    .map(({ cells }) => {
      return cells.map((cell) => {
        return cell.text;
      });
    });

  return sheetContent;
};

export default mapDatasheetToSheetContent;
