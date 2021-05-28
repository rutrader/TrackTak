export const modifyEventEmitter = (
  eventEmitter,
  debugMode,
  spreadsheetType,
) => {
  const oldEmit = eventEmitter.emit;

  eventEmitter.emit = (...args) => {
    if (debugMode) {
      console.log(spreadsheetType, ...args);
    }

    oldEmit.call(eventEmitter, ...args);
  };
};
