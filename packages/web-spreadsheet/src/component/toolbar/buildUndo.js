import { makeIconItem } from "./makeIconItem";

export const buildUndo = (eventEmitter, toolbarType) =>
  makeIconItem(eventEmitter, toolbarType)("undo", "Ctrl+Z");
