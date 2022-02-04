import 'regenerator-runtime/runtime'
import { HyperFormula } from '@tracktak/hyperformula'
import { offScreenConfig, namedExpressions } from '../../hyperformulaConfig'
import registerSharedFunctions from '../../registerSharedFunctions'
import { expose } from 'comlink'

const monteCarloWorker = {
  monteCarloSimulation: (
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

    const allPromises = []

    for (let i = 1; i <= iteration; i++) {
      // TODO: Fix issue where we can't use buildEmpty
      // and then set cause not resolving cells
      const [offscreenHyperformulaInstance, enginePromise] =
        HyperFormula.buildFromSheets(sheets, offScreenConfig, namedExpressions)

      const batchPromise = offscreenHyperformulaInstance.batch(() => {
        varAssumptionFormulaAddresses.forEach(
          ({ address, varAssumptionAddress, formula }) => {
            const [cellValue, formulaPromise] =
              offscreenHyperformulaInstance.calculateFormula(
                formula,
                varAssumptionAddress.sheet
              )

            if (formulaPromise) {
              const promise = new Promise((resolve, reject) => {
                formulaPromise
                  .then(cellValue => {
                    offscreenHyperformulaInstance.setCellContents(address, {
                      cellValue
                    })

                    resolve()
                  })
                  .catch(reject)
              })

              return promise
            }

            offscreenHyperformulaInstance.setCellContents(address, {
              cellValue
            })

            return Promise.resolve()
          }
        )
      })[1]

      const promise = new Promise((resolve, reject) => {
        Promise.all([batchPromise, enginePromise])
          .then(() => {
            const intersectionPointValue =
              offscreenHyperformulaInstance.getCellValue(
                intersectionCellReference
              ).cellValue

            offscreenHyperformulaInstance.destroy()

            resolve(intersectionPointValue)
          })
          .catch(reject)
      })

      allPromises.push(promise)
    }

    return Promise.all(allPromises)
  }
}

expose(monteCarloWorker)
