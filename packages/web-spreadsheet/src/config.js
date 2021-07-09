/* global window */
export const cssPrefix = "powersheet";
export const dpr =
  typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
export default {
  cssPrefix,
  dpr,
};
