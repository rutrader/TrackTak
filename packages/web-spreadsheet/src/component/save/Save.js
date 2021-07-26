import spreadsheetEvents from "../../core/spreadsheetEvents";

class Save {
  constructor(history, eventEmitter, getDatas) {
    this.history = history;
    this.eventEmitter = eventEmitter;
    this.getDatas = getDatas;
  }

  persistDataChange = () => {
    this.eventEmitter.emit(
      spreadsheetEvents.save.persistDataChange,
      this.getDatas(),
    );
  };

  persistDataChangeWithHistory = (type, name, data, callback) => {
    this.history.push({ type, name, data });
    callback();
    this.persistDataChange(type, name, data, callback);
  };
}

export default Save;
