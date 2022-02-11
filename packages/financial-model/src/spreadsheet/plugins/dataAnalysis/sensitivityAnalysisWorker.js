import { CachedGraphType, HyperFormula } from '@tracktak/hyperformula'
import { config, namedExpressions } from '../../hyperformulaConfig'
import registerSharedFunctions from '../../registerSharedFunctions'
import { expose } from 'comlink'

const sensitivityAnalysisWorker = {
  sensitivityAnalysis: async (
    intersectionCellReference,
    sheets,
    apiFrozenTimestamp,
    spreadsheetCreationDate,
    xVarCellReference,
    yVarCellReference,
    xRangeValues,
    yRangeValues
  ) => {
    const xAddress = {
      sheet: xVarCellReference.sheet,
      row: xVarCellReference.row,
      col: xVarCellReference.col
    }

    const yAddress = {
      sheet: yVarCellReference.sheet,
      row: yVarCellReference.row,
      col: yVarCellReference.col
    }

    const dataGetter = () => {
      return {
        apiFrozenTimestamp,
        spreadsheetCreationDate
      }
    }

    registerSharedFunctions(dataGetter)

    const [offscreenHyperformulaInstance, enginePromise] =
      HyperFormula.buildFromSheets(sheets, config, namedExpressions)

    await enginePromise

    offscreenHyperformulaInstance.useCachedGraph(CachedGraphType.SUB_GRAPH)

    const intersectionPointValues = []

    for (const xValue of xRangeValues) {
      const intersectionPointValuesRow = []

      offscreenHyperformulaInstance.suspendEvaluation()

      await offscreenHyperformulaInstance.setCellContents(xAddress, {
        cellValue: xValue
      })[1]

      for (const yValue of yRangeValues) {
        await offscreenHyperformulaInstance.setCellContents(yAddress, {
          cellValue: yValue
        })[1]

        offscreenHyperformulaInstance.resumeEvaluation()

        const intersectionPointValue =
          offscreenHyperformulaInstance.getCellValue(
            intersectionCellReference
          ).cellValue

        intersectionPointValuesRow.push(intersectionPointValue)
      }

      intersectionPointValues.push(intersectionPointValuesRow)
    }

    return intersectionPointValues
  }
}

expose(sensitivityAnalysisWorker)
