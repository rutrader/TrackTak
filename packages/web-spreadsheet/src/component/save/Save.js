import spreadsheetEvents from "../../core/spreadsheetEvents";

class Save {
  constructor(history, eventEmitter, getDatas) {
    this.history = history;
    this.eventEmitter = eventEmitter;
    this.getDatas = getDatas;
  }

  persistDataChange = (type, name, data, callback) => {
    this.history.push({ type, name, data });
    callback();
    this.eventEmitter.emit(
      spreadsheetEvents.save.persistDataChange,
      this.getDatas(),
    );
  };
}

export default Save;
