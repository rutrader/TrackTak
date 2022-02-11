import {
  CachedGraphType,
  DetailedCellError,
  HyperFormula
} from '@tracktak/hyperformula'
import { offScreenConfig, namedExpressions } from '../../hyperformulaConfig'
import registerSharedFunctions from '../../registerSharedFunctions'
import { expose } from 'comlink'

const monteCarloWorker = {
  monteCarloSimulation: async (
    intersectionCellReference,
    sheets,
    apiFrozenTimestamp,
    spreadsheetCreationDate,
    varAssumptionFormulaAddresses,
    iteration
  ) => {
    const dataGetter = () => {
      return {
        apiFrozenTimestamp,
        spreadsheetCreationDate
      }
    }

    const plugins = registerSharedFunctions(dataGetter)

    const [offscreenHyperformulaInstance, enginePromise] =
      HyperFormula.buildFromSheets(sheets, offScreenConfig, namedExpressions)

    await enginePromise

    offscreenHyperformulaInstance.useCachedGraph(CachedGraphType.SUB_GRAPH)

    const intersectionPointValues = []

    for (let i = 1; i <= iteration; i++) {
      offscreenHyperformulaInstance.suspendEvaluation()

      for (const {
        address,
        varAssumptionAddress,
        cellFormula
      } of varAssumptionFormulaAddresses) {
        let [cellValue, formulaPromise] =
          offscreenHyperformulaInstance.calculateFormula(
            cellFormula,
            varAssumptionAddress.sheet
          )

        if (formulaPromise) {
          await formulaPromise
        }

        if (cellValue instanceof DetailedCellError) {
          return cellValue
        }

        await offscreenHyperformulaInstance.setCellContents(address, {
          cellValue
        })[1]
      }

      offscreenHyperformulaInstance.resumeEvaluation()

      const intersectionPointValue = offscreenHyperformulaInstance.getCellValue(
        intersectionCellReference
      ).cellValue

      intersectionPointValues.push(intersectionPointValue)
    }

    offscreenHyperformulaInstance.destroy()

    plugins.forEach(({ plugin }) => {
      HyperFormula.unregisterFunctionPlugin(plugin)
    })

    return intersectionPointValues
  }
}

expose(monteCarloWorker)
