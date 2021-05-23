import { bottombarHeight } from "./bottombar";
import { toolbarHeight } from "./toolbar/getToolbar";

export const makeGetViewWidthHeight = (
  options,
  isVariablesSpreadsheet = false,
) => () => {
  const { view, showToolbar, showVariablesSpreadsheet } = options;
  let height;

  if (isVariablesSpreadsheet) {
    height = view.variablesSheetHeight();

    if (showToolbar) {
      height -= toolbarHeight;
    }
  } else {
    height = view.height();

    if (showVariablesSpreadsheet) {
      height -= view.variablesSheetHeight();
    }
    height -= bottombarHeight;
  }

  return {
    width: options.view.width(),
    height: height,
  };
};
