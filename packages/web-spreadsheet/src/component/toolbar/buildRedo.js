import { makeIconItem } from "./makeIconItem";

export const buildRedo = (eventEmitter) =>
  makeIconItem(eventEmitter)("redo", "Ctrl+Y");
