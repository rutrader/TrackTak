// import helper from '../helper';

import mapDatasheetToSheetContent from "../shared/mapDatasheetToSheetContent";

export default class History {
  constructor(hyperformula) {
    this.hyperformula = hyperformula;
    this.undoItems = [];
    this.redoItems = [];
  }

  add(data) {
    this.undoItems.push(JSON.stringify(data));
    this.redoItems = [];
  }

  canUndo() {
    return this.undoItems.length > 0;
  }

  canRedo() {
    return this.redoItems.length > 0;
  }

  undo(currentd, cb) {
    const { undoItems, redoItems } = this;
    if (this.canUndo()) {
      redoItems.push(JSON.stringify(currentd));
      const dataSheet = JSON.parse(undoItems.pop());
      const sheetContent = mapDatasheetToSheetContent(dataSheet);

      // TODO: make this just undo later
      this.hyperformula.setSheetContent(dataSheet.name, sheetContent);

      cb(dataSheet);
    }
  }

  redo(currentd, cb) {
    const { undoItems, redoItems } = this;
    if (this.canRedo()) {
      undoItems.push(JSON.stringify(currentd));
      const dataSheet = JSON.parse(redoItems.pop());
      const sheetContent = mapDatasheetToSheetContent(dataSheet);

      // TODO: make this just redo later
      this.hyperformula.setSheetContent(dataSheet.name, sheetContent);

      cb(dataSheet);
    }
  }
}
