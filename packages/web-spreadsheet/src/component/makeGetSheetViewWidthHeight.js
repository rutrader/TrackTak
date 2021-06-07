import { bottombarHeight } from "./bottombar";
import { toolbarHeight } from "./toolbar/getToolbar";

export const makeGetViewWidthHeight = (
  getOptions,
  getVariablesSheetOptions,
) => () => {
  const { view, showToolbar } = getOptions();
  const { show: showVariablesSheet } = getVariablesSheetOptions();

  let height;

  height = view.height();

  if (showVariablesSheet) {
    height -= getVariablesSheetOptions().view.height();
  }

  if (showToolbar) {
    height -= toolbarHeight;
  }

  height -= bottombarHeight;

  return {
    width: view.width(),
    height: height,
  };
};
