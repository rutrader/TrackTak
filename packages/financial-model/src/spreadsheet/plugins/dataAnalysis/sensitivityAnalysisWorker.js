import 'regenerator-runtime/runtime'
import { HyperFormula } from '@tracktak/hyperformula'
import { config, namedExpressions } from '../../hyperformulaConfig'
import registerSharedFunctions from '../../registerSharedFunctions'
import { expose } from 'comlink'

const pluginWorker = {
  sensitivityAnalysis: (
    intersectionCellReference,
    sheets,
    apiFrozenTimestamp,
    spreadsheetCreationDate,
    xVarCellReference,
    yVarCellReference,
    xRangeValues,
    yRangeValues,
    xSheetName,
    ySheetName
  ) => {
    const { row: xRow, col: xCol } = xVarCellReference
    const { row: yRow, col: yCol } = yVarCellReference

    const dataGetter = () => {
      return {
        apiFrozenTimestamp,
        spreadsheetCreationDate
      }
    }

    registerSharedFunctions(dataGetter)

    const allPromises = []

    for (const xValue of xRangeValues) {
      sheets[xSheetName].cells[xRow][xCol] = {
        ...sheets[xSheetName].cells[xRow][xCol],
        cellValue: xValue
      }

      const rowPromise = new Promise((resolve, reject) => {
        const promises = yRangeValues.map(yValue => {
          sheets[ySheetName].cells[yRow][yCol] = {
            ...sheets[ySheetName].cells[yRow][yCol],
            cellValue: yValue
          }

          const promise = new Promise((resolve, reject) => {
            const [offscreenHyperformulaInstance, enginePromise] =
              HyperFormula.buildFromSheets(sheets, config, namedExpressions)

            enginePromise
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

          return promise
        })

        Promise.all(promises).then(resolve).catch(reject)
      })

      allPromises.push(rowPromise)
    }

    return Promise.all(allPromises)
  }
}

expose(pluginWorker)
