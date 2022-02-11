import {
  CachedGraphType,
  DetailedCellError,
  HyperFormula
} from '@tracktak/hyperformula'
import { offScreenConfig, namedExpressions } from '../../hyperformulaConfig'
import registerSharedFunctions from '../../registerSharedFunctions'
import { expose } from 'comlink'

// TODO: Try running this with GPU instead, maybe it's even faster
// TODO: How to handle multiple monte carlo's in the same sheet?
const monteCarloWorker = {
  async setup(sheets, apiFrozenTimestamp, spreadsheetCreationDate) {
    const dataGetter = () => {
      return {
        apiFrozenTimestamp,
        spreadsheetCreationDate
      }
    }

    this.plugins = registerSharedFunctions(dataGetter)

    const [varAssumptionsInstance, varAssumptionsInstancePromise] =
      HyperFormula.buildFromSheets(sheets, offScreenConfig, namedExpressions)

    const [calculationInstance, calculationInstancePromise] =
      HyperFormula.buildFromSheets(sheets, offScreenConfig, namedExpressions)

    this.varAssumptionsInstance = varAssumptionsInstance
    this.calculationInstance = calculationInstance

    await Promise.all([
      varAssumptionsInstancePromise,
      calculationInstancePromise
    ])

    this.varAssumptionsInstance.useCachedGraph(CachedGraphType.SUB_GRAPH)
    this.calculationInstance.useCachedGraph(CachedGraphType.SUB_GRAPH)
  },
  async calculate(
    intersectionCellReference,
    varAssumptionFormulaAddresses,
    iteration
  ) {
    const intersectionPointValues = []

    for (let i = 1; i <= iteration; i++) {
      this.calculationInstance.suspendEvaluation()

      for (const {
        address,
        varAssumptionAddress,
        cellFormula
      } of varAssumptionFormulaAddresses) {
        let [cellValue, formulaPromise] =
          // We must use a second hyperformula instance here
          // because otherwise cellReferences in the formula
          // will have different values each iteration
          this.varAssumptionsInstance.calculateFormula(
            cellFormula,
            varAssumptionAddress.sheet
          )

        if (formulaPromise) {
          await formulaPromise
        }

        if (cellValue instanceof DetailedCellError) {
          return cellValue
        }

        await this.calculationInstance.setCellContents(address, {
          cellValue
        })[1]
      }

      this.calculationInstance.resumeEvaluation()

      const intersectionPointValue = this.calculationInstance.getCellValue(
        intersectionCellReference
      ).cellValue

      intersectionPointValues.push(intersectionPointValue)
    }

    return intersectionPointValues
  }
}

expose(monteCarloWorker)
