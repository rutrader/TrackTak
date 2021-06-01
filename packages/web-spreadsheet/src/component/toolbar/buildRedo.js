import { makeIconItem } from "./makeIconItem";

export const buildRedo = (eventEmitter, toolbarType) =>
  makeIconItem(eventEmitter, toolbarType)("redo", "Ctrl+Y");
