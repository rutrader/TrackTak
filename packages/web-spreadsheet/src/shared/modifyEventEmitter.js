export const modifyEventEmitter = (eventEmitter) => {
  const oldEmit = eventEmitter.emit;

  eventEmitter.emit = (...args) => {
    console.log(...args);

    oldEmit.call(eventEmitter, ...args);
  };
};
