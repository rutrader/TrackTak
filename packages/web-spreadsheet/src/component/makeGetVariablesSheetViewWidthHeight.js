import { toolbarHeight } from "./toolbar/getToolbar";

export const makeGetVariablesSheetViewWidthHeight = (getOptions) => () => {
  const { view, showToolbar } = getOptions();
  let height;

  height = getOptions().view.height();

  if (showToolbar) {
    height -= toolbarHeight;
  }

  return {
    width: view.width(),
    height: height,
  };
};
