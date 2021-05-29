import { defaultVariablesSpreadsheetOptions } from "../core/defaultOptions";
import { bottombarHeight } from "./bottombar";
import { toolbarHeight } from "./toolbar/getToolbar";

export const makeGetViewWidthHeight = (
  getOptions,
  isVariablesSpreadsheet = false,
) => () => {
  const { view, showToolbar, showVariablesSpreadsheet } = getOptions();
  let height;

  if (isVariablesSpreadsheet) {
    // TODO: Change default to actual from getVariablesOptions
    height = defaultVariablesSpreadsheetOptions.view.height();

    if (showToolbar) {
      height -= toolbarHeight;
    }
  } else {
    height = view.height();

    if (showVariablesSpreadsheet) {
      height -= defaultVariablesSpreadsheetOptions.view.height();
    }
    height -= bottombarHeight;
  }

  return {
    width: view.width(),
    height: height,
  };
};
