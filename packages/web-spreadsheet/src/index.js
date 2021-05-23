import { h } from "./component/element";
import { getSheet } from "./component/getSheet";
import { getBottombar } from "./component/bottombar";
import { cssPrefix } from "./config";
import { locale, t } from "./locale/locale";
import "./index.less";
import { HyperFormula } from "hyperformula";
import EventEmitter from "events";
import spreadsheetEvents from "./core/spreadsheetEvents";
import withToolbar from "./component/withToolbar";
import { getTable } from "./component/table/getTable";
import { getResizer } from "./component/getResizer";
import { getScrollbar } from "./component/getScrollbar";
import { getEditor } from "./component/editor";
import ModalValidation from "./component/modal_validation";
import { getContextMenu } from "./component/contextmenu";
import { makeGetViewWidthHeight } from "./component/makeGetViewWidthHeight";
import Selector from "./component/selector";
import SortFilter from "./component/sort_filter";
import defaultOptions from "./core/defaultOptions";
import { merge } from "lodash-es";
import { buildDataProxy, makeGetDataProxy } from "./core/makeGetDataProxy";

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

const buildSheet = (element, options, hyperformula, eventEmitter) => {
  const rootEl = h("div", `${cssPrefix}`).on("contextmenu", (evt) =>
    evt.preventDefault(),
  );
  const getViewWidthHeight = makeGetViewWidthHeight(options);

  const table = getTable(options, hyperformula);
  const rowResizer = getResizer(
    eventEmitter,
    spreadsheetEvents.rowResizer,
    options.row.height,
  );
  const colResizer = getResizer(
    eventEmitter,
    spreadsheetEvents.colResizer,
    options.col.minWidth,
    true,
  );
  const verticalScrollbar = getScrollbar(eventEmitter, true);
  const horizontalScrollbar = getScrollbar(eventEmitter, false);
  const editor = getEditor(getFormulaSuggestions(), eventEmitter);
  const modalValidation = new ModalValidation();
  const contextMenu = getContextMenu(
    () => getViewWidthHeight(),
    eventEmitter,
    !options.showContextMenu,
  );
  const selector = new Selector();
  const sortFilter = new SortFilter();
  const sheet = withToolbar(
    getSheet(
      rootEl,
      table,
      rowResizer,
      colResizer,
      verticalScrollbar,
      horizontalScrollbar,
      editor,
      modalValidation,
      contextMenu,
      selector,
      sortFilter,
      eventEmitter,
      hyperformula,
      options,
    ),
    rootEl,
    options,
  );
  console.log("te");
  const dataProxyBuilder = buildDataProxy(options, hyperformula);

  const getDataProxy = makeGetDataProxy(
    dataProxyBuilder,
    options,
    eventEmitter,
  );

  const setDatasheets = sheet.makeSetDatasheets(getDataProxy);

  getBottombar(rootEl, eventEmitter);

  element.appendChild(rootEl.el);

  const showFormulas = () => {
    table.setCalculateFormulas(false);
    table.render();
  };

  const hideFormulas = () => {
    table.setCalculateFormulas(true);
    table.render();
  };

  eventEmitter.on(spreadsheetEvents.bottombar.addSheet, () => {
    const data = sheet.addData(getDataProxy);

    sheet.resetData(data);
  });

  return {
    sheet,
    rootEl,
    showFormulas,
    hideFormulas,
    setDatasheets,
  };
};

const getSpreadsheet = (element, options) => {
  // const setVariablesData = (variableSheets) => {
  //   variablesSheetDatas = [];

  //   variableSheets.forEach((variableSheet, i) => {
  //     const options = merge(defaultOptions, newOptions[i]);
  //     const data = addVariablesSheetData(variableSheet.name, options);

  //     if (hyperformula.isItPossibleToAddSheet(variableSheet.name)) {
  //       hyperformula.addSheet(variableSheet.name);
  //     }

  //     data.setData(variableSheet);

  //     if (i === 0) {
  //       variablesSheet.resetData(data);
  //     }
  //   });
  // };

  // const variablesData = addVariablesSheetData();

  // const variablesTable = getVariablesTable(data, hyperformula);
  // const variablesSheet = withVariablesToolbar(
  //   getSheet(
  //     rootEl,
  //     variablesData,
  //     variablesTable,
  //     eventEmitter,
  //     hyperformula,
  //     options,
  //     true,
  //   ),
  // );
  const newOptions = merge(defaultOptions, options);
  const hyperformula = HyperFormula.buildEmpty({
    licenseKey: "05054-b528f-a10c4-53f2a-04b57",
  });
  const eventEmitter = new EventEmitter();

  const {
    rootEl,
    sheet,
    showFormulas,
    hideFormulas,
    setDatasheets,
  } = buildSheet(element, newOptions, hyperformula, eventEmitter);

  const setVariables = (variables) => {
    Object.keys(variables).forEach((key) => {
      const value = variables[key];

      if (hyperformula.isItPossibleToChangeNamedExpression(key, value)) {
        hyperformula.changeNamedExpression(key, value);
      }

      if (hyperformula.isItPossibleToAddNamedExpression(key, value)) {
        hyperformula.addNamedExpression(key, value);
      }
    });
  };

  const destroy = () => {
    rootEl.destroy();
  };

  return {
    sheet,
    setVariables,
    destroy,
    showFormulas,
    hideFormulas,
    hyperformula,
    eventEmitter,
    setDatasheets,
  };
};

export default getSpreadsheet;
export { locale };
