import { makeIconItem } from "./makeIconItem";

export const buildUndo = (eventEmitter) =>
  makeIconItem(eventEmitter)("undo", "Ctrl+Z");
