import 'regenerator-runtime/runtime'
import { HyperFormula } from '@tracktak/hyperformula'
import { config, namedExpressions } from '../hyperformulaConfig'
import '../plugins'

addEventListener('message', e => {
  const { task, intersectionCellReference, sheets } = e.data[1]

  if (task === 'DATA_ANALYSIS') {
    const [offscreenHyperformulaInstance, enginePromise] =
      HyperFormula.buildFromSheets(sheets, config, namedExpressions)

    const promise = new Promise((resolve, reject) => {
      enginePromise
        .then(() => {
          const intersectionPointValue =
            offscreenHyperformulaInstance.getCellValue(
              intersectionCellReference
            ).cellValue

          // offscreenHyperformulaInstance.destroy()

          resolve(intersectionPointValue)
        })
        .catch(reject)
    })

    return promise
  }

  throw new Error('task not defined')
})
