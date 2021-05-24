import { bottombarHeight } from "./bottombar";
import { toolbarHeight } from "./toolbar/getToolbar";

export const makeGetViewWidthHeight = (
  getOptions,
  isVariablesSpreadsheet = false,
) => () => {
  const { view, showToolbar, showVariablesSpreadsheet } = getOptions();
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
    width: view.width(),
    height: height,
  };
};
