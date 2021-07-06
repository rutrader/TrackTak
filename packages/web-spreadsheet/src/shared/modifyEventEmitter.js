import spreadsheetEvents, { saveEventsArray } from "../core/spreadsheetEvents";

export const modifyEventEmitter = (
  eventEmitter,
  debugMode,
  spreadsheetType,
  getDatas,
) => {
  const oldEmit = eventEmitter.emit;

  eventEmitter.emit = (...args) => {
    const eventType = args[0];

    if (saveEventsArray.find((element) => element === eventType)) {
      eventEmitter.emit(spreadsheetEvents.save, getDatas());
    }

    if (debugMode) {
      console.log(spreadsheetType, ...args);
    }

    oldEmit.call(eventEmitter, ...args);
  };
};
