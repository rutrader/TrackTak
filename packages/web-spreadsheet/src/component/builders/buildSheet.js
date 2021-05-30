import { getResizer } from "../getResizer";
import { getScrollbar } from "../getScrollbar";
import { getEditor } from "../editor";
import ModalValidation from "../modal_validation";
import { getContextMenu } from "../getContextmenu";
import Selector from "../selector";
import SortFilter from "../sort_filter";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { HyperFormula } from "hyperformula";
import { t } from "../../locale/locale";

const getFormulaSuggestions = () => {
  const formulaSuggestions = HyperFormula.getRegisteredFunctionNames(
    "enGB",
  ).map((formulaName) => {
    const escapedFormulaName = formulaName.replace(".", "\\.");
    return {
      key: escapedFormulaName,
      // Function that returns translation of the formula name if one exists,
      // otherwise the formula name
      title: () => t(`formula.${escapedFormulaName}`) || formulaName,
    };
  });

  return formulaSuggestions;
};

export const buildSheet = (
  getOptions,
  getData,
  eventEmitter,
  getViewWidthHeight,
) => {
  const rowResizer = getResizer(
    eventEmitter,
    spreadsheetEvents.rowResizer,
    () => getOptions().row.height,
  );
  const colResizer = getResizer(
    eventEmitter,
    spreadsheetEvents.colResizer,
    () => getOptions().col.minWidth,
    true,
  );
  const verticalScrollbar = getScrollbar(eventEmitter, true);
  const horizontalScrollbar = getScrollbar(eventEmitter, false);
  const editor = getEditor(getData, getFormulaSuggestions(), eventEmitter);
  const modalValidation = new ModalValidation();
  const contextMenu = getContextMenu(getViewWidthHeight, eventEmitter, () => {
    return !getOptions().showContextmenu;
  });
  const selector = new Selector(eventEmitter, getData);
  const sortFilter = new SortFilter();

  return () => ({
    rowResizer,
    colResizer,
    verticalScrollbar,
    horizontalScrollbar,
    editor,
    modalValidation,
    contextMenu,
    selector,
    sortFilter,
  });
};
