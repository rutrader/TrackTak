import {
  CellError,
  FunctionPlugin,
  SimpleRangeValue
} from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import {
  xMaxValueCellError,
  xMinValueCellError,
  yMaxValueCellError,
  yMinValueCellError,
  varAssumptionsCellError,
  varCellReferencesCellError,
  varAssumptionReferencesMatchCellError,
  intersectionCellReferenceError,
  getVarAssumptionNotValidTypeError,
  xVarCellReferencesCellError,
  yVarCellReferencesCellError
} from './cellErrors'
import truncateDecimal from '../../shared/truncateDecimal'
import {
  mean,
  stdev,
  variance,
  percentile
} from '@tracktak/hyperformula/es/interpreter/plugin/3rdparty/jstat/jstat'
import {
  confidenceIntervalFormula,
  kurtosisFormula,
  medianFormula,
  skewnessFormula
} from '../../../statsFormulas'
import { wrap } from 'comlink'
import { inferSizeMethod } from '../helpers'
import { isSimpleCellAddress } from '@tracktak/hyperformula/es/Cell'

const sensitivityAnalysisWorker = wrap(
  new Worker(new URL('sensitivityAnalysisWorker.js', import.meta.url), {
    type: 'module'
  })
)

const monteCarloWorker = wrap(
  new Worker(new URL('monteCarloWorker.js', import.meta.url), {
    type: 'module'
  })
)

const coefficientOfVariationFormula = arrVector => {
  return stdev(arrVector) / mean(arrVector)
}

const stDevErrorOfMeanFormula = arr => {
  return stdev(arr) / Math.sqrt(arr.length)
}

const getConfidenceInterval = arr => {
  return confidenceIntervalFormula(stDevErrorOfMeanFormula(arr), 1.96)
}

const getLowerUpperHalves = (midPoint, minPoint) => {
  const lowerHalfPoint = (midPoint - minPoint) / 2 + minPoint
  const upperHalfPoint = midPoint - lowerHalfPoint + midPoint

  const truncateLowerHalfPoint = truncateDecimal(lowerHalfPoint, 2)
  const truncateUpperHalfPoint = truncateDecimal(upperHalfPoint, 2)

  return { truncateLowerHalfPoint, truncateUpperHalfPoint }
}

// TODO: Add doesNotNeedArgumentsToBeComputed for each cell reference argument
// in hyperformula
export const implementedFunctions = {
  'DATA_ANALYSIS.SENSITIVITY_ANALYSIS': {
    method: 'sensitivityAnalysis',
    arraySizeMethod: 'dataAnalysisSize',
    inferReturnType: true,
    isAsyncMethod: true,
    parameters: [
      {
        argumentType: ArgumentTypes.NUMBER
      },
      {
        argumentType: ArgumentTypes.NUMBER
      },
      {
        argumentType: ArgumentTypes.NUMBER
      },
      {
        argumentType: ArgumentTypes.NUMBER
      },
      {
        argumentType: ArgumentTypes.NUMBER
      },
      {
        argumentType: ArgumentTypes.NUMBER
      },
      {
        argumentType: ArgumentTypes.NUMBER
      }
    ]
  },
  'DATA_ANALYSIS.MONTE_CARLO_SIMULATION': {
    method: 'monteCarloSimulation',
    arraySizeMethod: 'dataAnalysisSize',
    inferReturnType: true,
    isAsyncMethod: true,
    parameters: [
      {
        argumentType: ArgumentTypes.NUMBER
      },
      {
        argumentType: ArgumentTypes.RANGE
      },
      {
        argumentType: ArgumentTypes.RANGE
      },
      {
        argumentType: ArgumentTypes.NUMBER,
        greaterThan: 0,
        defaultValue: 10000
      }
    ]
  }
}

export const translations = {
  enGB: {
    'DATA_ANALYSIS.SENSITIVITY_ANALYSIS': 'DATA_ANALYSIS.SENSITIVITY_ANALYSIS',
    'DATA_ANALYSIS.MONTE_CARLO_SIMULATION':
      'DATA_ANALYSIS.MONTE_CARLO_SIMULATION'
  }
}

export const getPlugin = dataGetter => {
  class Plugin extends FunctionPlugin {
    sensitivityAnalysis(ast, state) {
      const hyperformula = dataGetter().spreadsheet.hyperformula
      const metadata = this.metadata('DATA_ANALYSIS.SENSITIVITY_ANALYSIS')

      return this.runAsyncFunction(
        ast.args,
        state,
        metadata,
        async (_, xVar, yVar, xMin, xMax, yMin, yMax) => {
          const isIntersectionCellReferenceValid =
            ast.args[0].type === 'CELL_REFERENCE'

          const isXVarCellReferenceValid = ast.args[1].type === 'CELL_REFERENCE'

          const isYVarCellReferenceValid = ast.args[2].type === 'CELL_REFERENCE'

          if (!isIntersectionCellReferenceValid) {
            return intersectionCellReferenceError
          }

          if (!isXVarCellReferenceValid) {
            return xVarCellReferencesCellError
          }

          if (!isYVarCellReferenceValid) {
            return yVarCellReferencesCellError
          }

          const intersectionCellReference =
            ast.args[0].reference.toSimpleCellAddress(state.formulaAddress)

          const xVarCellReference = ast.args[1].reference.toSimpleCellAddress(
            state.formulaAddress
          )
          const yVarCellReference = ast.args[2].reference.toSimpleCellAddress(
            state.formulaAddress
          )
          const xSheetName = hyperformula.getSheetName(xVarCellReference.sheet)
          const ySheetName = hyperformula.getSheetName(yVarCellReference.sheet)

          const isXMinValid = xVar > xMin
          const isXMaxValid = xVar < xMax

          if (!isXMinValid) {
            return xMinValueCellError
          }

          if (!isXMaxValid) {
            return xMaxValueCellError
          }

          const isYMinValid = yVar > yMin
          const isYMaxValid = yVar < yMax

          if (!isYMinValid) {
            return yMinValueCellError
          }

          if (!isYMaxValid) {
            return yMaxValueCellError
          }

          const xLowerUpper = getLowerUpperHalves(xVar, xMin)
          const yLowerUpper = getLowerUpperHalves(yVar, yMin)

          const xRangeValues = [
            xMin,
            xLowerUpper.truncateLowerHalfPoint,
            xVar,
            xLowerUpper.truncateUpperHalfPoint,
            xMax
          ]
          const yRangeValues = [
            yMin,
            yLowerUpper.truncateLowerHalfPoint,
            yVar,
            yLowerUpper.truncateUpperHalfPoint,
            yMax
          ]

          const sheets = this.getSheetsFromAddress(
            state.formulaAddress,
            hyperformula
          )

          const { apiFrozenTimestamp, spreadsheetCreationDate } = dataGetter()

          const intersectionPointValues =
            await sensitivityAnalysisWorker.sensitivityAnalysis(
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
            )

          intersectionPointValues.unshift(xRangeValues)
          intersectionPointValues[0].unshift('')
          intersectionPointValues.forEach((arr, i) => {
            if (i !== 0) {
              arr.unshift(yRangeValues[i - 1])
            }
          })

          return SimpleRangeValue.onlyValues(intersectionPointValues)
        }
      )
    }

    monteCarloSimulation(ast, state) {
      const hyperformula = dataGetter().spreadsheet.hyperformula
      const metadata = this.metadata('DATA_ANALYSIS.MONTE_CARLO_SIMULATION')

      return this.runAsyncFunction(
        ast.args,
        state,
        metadata,
        async (_, __, ___, iteration) => {
          const isIntersectionCellReferenceValid =
            ast.args[0].type === 'CELL_REFERENCE'
          const isVarCellReferencesValid =
            ast.args[1].args.length === 1 &&
            ast.args[1].args.every(arr =>
              arr.every(x => x.type === 'CELL_REFERENCE')
            )
          const isVarAssumptionValid =
            ast.args[2].args.length === 1 &&
            ast.args[2].args.every(arr =>
              arr.every(x => x.type === 'CELL_REFERENCE')
            )
          const varCellReferenceAssumptionsMatch =
            ast.args[1].args[0].length === ast.args[2].args[0].length

          if (!isIntersectionCellReferenceValid) {
            return intersectionCellReferenceError
          }

          if (!isVarCellReferencesValid) {
            return varCellReferencesCellError
          }

          if (!isVarAssumptionValid) {
            return varAssumptionsCellError
          }

          if (!varCellReferenceAssumptionsMatch) {
            return varAssumptionReferencesMatchCellError
          }

          const intersectionCellReference =
            ast.args[0].reference.toSimpleCellAddress(state.formulaAddress)

          const varCellReferences = ast.args[1].args.map(arr => {
            return arr.map(({ reference }) =>
              reference.toSimpleCellAddress(state.formulaAddress)
            )
          })[0]

          const varAssumptionCellReferences = ast.args[2].args.map(arr => {
            return arr.map(({ reference }) =>
              reference.toSimpleCellAddress(state.formulaAddress)
            )
          })[0]

          const varAssumptionFormulaAddresses = []

          for (let index = 0; index < varCellReferences.length; index++) {
            const address = varCellReferences[index]

            const varAssumptionAddress = varAssumptionCellReferences[index]
            const cellSerialized =
              hyperformula.getCellSerialized(varAssumptionAddress).cellValue

            const addressString = hyperformula.simpleCellAddressToString(
              varAssumptionAddress,
              varAssumptionAddress.sheet
            )

            if (typeof cellSerialized !== 'string') {
              return getVarAssumptionNotValidTypeError(
                addressString,
                cellSerialized
              )
            }

            if (!hyperformula.validateFormula(cellSerialized)) {
              return getVarAssumptionNotValidTypeError(
                addressString,
                cellSerialized
              )
            }

            varAssumptionFormulaAddresses.push({
              cellFormula: cellSerialized,
              varAssumptionAddress,
              address
            })
          }

          const sheets = this.getSheetsFromAddress(
            state.formulaAddress,
            hyperformula
          )

          const { chunked } = ast.asyncPromise
          const { apiFrozenTimestamp, spreadsheetCreationDate } = dataGetter()
          const chunkedIterator = 3334

          const intersectionPointValues =
            await monteCarloWorker.monteCarloSimulation(
              intersectionCellReference,
              sheets,
              apiFrozenTimestamp,
              spreadsheetCreationDate,
              varAssumptionFormulaAddresses,
              chunkedIterator
            )

          if (!Array.isArray(intersectionPointValues)) {
            const { type, message } = intersectionPointValues

            return new CellError(type, message)
          }

          chunked.chunkedIterator += chunkedIterator
          chunked.isChunked = chunked.chunkedIterator < iteration

          const n = 11
          const percentiles = Array.from(
            Array(n),
            (_, number) => number / 10
          ).map(percent => {
            return [
              percent * 100 + '%',
              percentile(intersectionPointValues, percent, false)
            ]
          })

          const trialsOutput = iteration
          const meanOutput = mean(intersectionPointValues)
          const medianOutput = medianFormula(intersectionPointValues)
          const min = Math.min(...intersectionPointValues)
          const max = Math.max(...intersectionPointValues)
          const stddevOutput = stdev(intersectionPointValues)
          const varianceOutput = variance(intersectionPointValues)
          const skewnessOutput = skewnessFormula(intersectionPointValues)
          const kurtosisOutput = kurtosisFormula(intersectionPointValues)
          const coefficientOfVariationOutput = coefficientOfVariationFormula(
            intersectionPointValues
          )
          const stDevErrorOfMeanOutput = stDevErrorOfMeanFormula(
            intersectionPointValues
          )
          const upperLimitOutput =
            mean(intersectionPointValues) +
            getConfidenceInterval(intersectionPointValues)
          const lowerLimitOutput =
            mean(intersectionPointValues) -
            getConfidenceInterval(intersectionPointValues)

          const values = [
            ['', 'Output Info'],
            ['Trials', trialsOutput],
            ['Mean', meanOutput],
            ['Median', medianOutput],
            ['Minimum', min],
            ['Maximum', max],
            ['Standard Deviation', stddevOutput],
            ['Variance', varianceOutput],
            ['Skewness', skewnessOutput],
            ['Kurtosis', kurtosisOutput],
            ['Coeff. of Variation', coefficientOfVariationOutput],
            ['Mean Standard Error', stDevErrorOfMeanOutput],
            ['@95% Upper Limit', upperLimitOutput],
            ['@95% Lower Limit', lowerLimitOutput]
          ]

          percentiles.unshift(['Percentile', 'Forecasted values'])

          percentiles.forEach((arr, i) => {
            values[i] = [...values[i], ...arr]
          })

          return SimpleRangeValue.onlyValues(values)
        }
      )
    }

    getSheetsFromAddress(address, hyperformula) {
      const cellPrecedents = hyperformula.getAllCellPrecedents(address)

      const sheetNames = hyperformula.getSheetNames()
      const sheets = {}

      sheetNames.forEach(sheetName => {
        const sheetId = hyperformula.getSheetId(sheetName)
        const sheetMetadata = hyperformula.getSheetMetadata(sheetId)

        sheets[sheetName] = {
          cells: [],
          sheetMetadata
        }
      })

      cellPrecedents.forEach(address => {
        if (isSimpleCellAddress(address)) {
          const sheetName = hyperformula.getSheetName(address.sheet)

          if (sheets[sheetName]) {
            // cellArray addresses do not contain values
            let cell = hyperformula.isCellPartOfArray(address)
              ? hyperformula.getCellValue(address)
              : hyperformula.getCellSerialized(address)

            const cells = sheets[sheetName].cells

            if (!cells[address.row]) {
              cells[address.row] = []
            }

            cells[address.row][address.col] = cell
          }
        }
      })

      return sheets
    }

    dataAnalysisSize(ast, state) {
      return inferSizeMethod(ast, state)
    }
  }

  Plugin.implementedFunctions = implementedFunctions

  return Plugin
}
