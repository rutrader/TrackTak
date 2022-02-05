import 'regenerator-runtime/runtime'
import { HyperFormula } from '@tracktak/hyperformula'
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

    registerSharedFunctions(dataGetter)

    const [offscreenHyperformulaInstance, enginePromise] =
      HyperFormula.buildFromSheets(sheets, offScreenConfig, namedExpressions)

    await enginePromise

    const intersectionPointValues = []

    for (let i = 1; i <= iteration; i++) {
      for (const {
        address,
        varAssumptionAddress,
        formula
      } of varAssumptionFormulaAddresses) {
        const [cellValue, formulaPromise] =
          offscreenHyperformulaInstance.calculateFormula(
            formula,
            varAssumptionAddress.sheet
          )

        if (formulaPromise) {
          await formulaPromise
        }

        await offscreenHyperformulaInstance.setCellContents(address, {
          cellValue
        })[1]
      }

      const intersectionPointValue = offscreenHyperformulaInstance.getCellValue(
        intersectionCellReference
      ).cellValue

      intersectionPointValues.push(intersectionPointValue)
    }

    offscreenHyperformulaInstance.destroy()

    return intersectionPointValues
  }
}

expose(monteCarloWorker)
