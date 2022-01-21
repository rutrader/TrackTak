import {
  FunctionPlugin,
  HyperFormula,
  SimpleRangeValue
} from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { ArraySize } from '@tracktak/hyperformula/es/ArraySize'
import {
  xMaxValueCellError,
  xMinMaxValuesCellError,
  xMinValueCellError,
  yMaxValueCellError,
  yMinMaxValuesCellError,
  yMinValueCellError,
  varAssumptionValuesCellError
} from './cellErrors'
import truncateDecimal from '../../shared/truncateDecimal'
import { config, namedExpressions } from '../../hyperformulaConfig'
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

export const standardizedMoment = (arr, n) => {
  const mu = mean(arr)
  const sigma = stdev(arr)
  const length = arr.length
  let skewSum = 0

  for (let i = 0; i < length; i++) skewSum += Math.pow((arr[i] - mu) / sigma, n)

  return skewSum / arr.length
}

export const coefficientOfVariationFormula = arrVector => {
  return stdev(arrVector) / mean(arrVector)
}

export const stDevErrorOfMeanFormula = arr => {
  return stdev(arr) / Math.sqrt(arr.length)
}

export const getConfidenceInterval = arr => {
  return confidenceIntervalFormula(stDevErrorOfMeanFormula(arr), 1.96)
}

const getLowerUpperHalves = (midPoint, minPoint) => {
  const lowerHalfPoint = (midPoint - minPoint) / 2 + minPoint
  const upperHalfPoint = midPoint - lowerHalfPoint + midPoint

  const truncatelowerHalfPoint = truncateDecimal(lowerHalfPoint, 2)
  const truncateUpperHalfPoint = truncateDecimal(upperHalfPoint, 2)

  return { truncatelowerHalfPoint, truncateUpperHalfPoint }
}

export const implementedFunctions = {
  'DATA_ANALYSIS.SENSITIVITY_ANALYSIS': {
    method: 'sensitivityAnalysis',
    arraySizeMethod: 'dataAnalysisSensitivitySize',
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
        argumentType: ArgumentTypes.RANGE
      },
      {
        argumentType: ArgumentTypes.RANGE
      }
    ]
  },
  'DATA_ANALYSIS.MONTE_CARLO_SIMULATION': {
    method: 'monteCarloSimulation',
    arraySizeMethod: 'dataAnalysisMonteCarloSize',
    parameters: [
      {
        argumentType: ArgumentTypes.NUMBER
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

export class Plugin extends FunctionPlugin {
  sensitivityAnalysis(ast, state) {
    const metadata = this.metadata('DATA_ANALYSIS.SENSITIVITY_ANALYSIS')

    const interesectionCellReference =
      ast.args[0].reference.toSimpleCellAddress(state.formulaAddress)

    const xVarCellReference = ast.args[1].reference.toSimpleCellAddress(
      state.formulaAddress
    )

    const yVarCellReference = ast.args[2].reference.toSimpleCellAddress(
      state.formulaAddress
    )

    return this.runFunction(
      ast.args,
      state,
      metadata,
      (_, xVar, yVar, xMinMax, yMinMax) => {
        const sheets = this.serialization.getAllSheetsSerialized()

        HyperFormula.unregisterFunction('DATA_ANALYSIS.SENSITIVITY_ANALYSIS')
        HyperFormula.unregisterFunction('D.SA')

        const hfInstance = HyperFormula.buildFromSheets(
          sheets,
          config,
          namedExpressions
        )[0]

        const xMinMaxData = xMinMax.rawData()
        const yMinMaxData = yMinMax.rawData()

        const isXMinMaxValid =
          xMinMaxData.length === 1 && xMinMaxData[0].length === 2
        const isYMinMaxValid =
          yMinMaxData.length === 1 && yMinMaxData[0].length === 2

        if (!isXMinMaxValid) {
          return xMinMaxValuesCellError
        }

        if (!isYMinMaxValid) {
          return yMinMaxValuesCellError
        }

        const xMinValue = xMinMaxData[0][0]
        const yMinValue = yMinMaxData[0][0]

        const xMaxValue = xMinMaxData[0][1]
        const yMaxValue = yMinMaxData[0][1]

        const isXMinValid = xVar > xMinValue
        const isXMaxValid = xVar < xMaxValue

        if (!isXMinValid) {
          return xMinValueCellError
        }

        if (!isXMaxValid) {
          return xMaxValueCellError
        }

        const isYMinValid = yVar > yMinValue
        const isYMaxValid = yVar < yMaxValue

        if (!isYMinValid) {
          return yMinValueCellError
        }

        if (!isYMaxValid) {
          return yMaxValueCellError
        }

        const xLowerUpper = getLowerUpperHalves(xVar, xMinValue)
        const yLowerUpper = getLowerUpperHalves(yVar, yMinValue)

        const xRangeValues = [
          xMinValue,
          xLowerUpper.truncatelowerHalfPoint,
          xVar,
          xLowerUpper.truncateUpperHalfPoint,
          xMaxValue
        ]
        const yRangeValues = [
          yMinValue,
          yLowerUpper.truncatelowerHalfPoint,
          yVar,
          yLowerUpper.truncateUpperHalfPoint,
          yMaxValue
        ]

        const intersectionPointValues = yRangeValues.map(xValue => {
          hfInstance.setCellContents(xVarCellReference, xValue)

          return xRangeValues.map(yValue => {
            hfInstance.setCellContents(yVarCellReference, yValue)

            const interesectionPointValue = hfInstance.getCellValue(
              interesectionCellReference
            )

            return interesectionPointValue
          })
        })

        intersectionPointValues.unshift(xRangeValues)
        intersectionPointValues[0].unshift('')
        intersectionPointValues.forEach((arr, i) => {
          if (i !== 0) {
            arr.unshift(yRangeValues[i - 1])
          }
        })

        hfInstance.destroy()

        HyperFormula.registerFunction(
          'DATA_ANALYSIS.SENSITIVITY_ANALYSIS',
          Plugin
        )
        HyperFormula.registerFunction('D.SA', Plugin)

        return SimpleRangeValue.onlyValues(intersectionPointValues)
      }
    )
  }

  monteCarloSimulation(ast, state) {
    const metadata = this.metadata('DATA_ANALYSIS.MONTE_CARLO_SIMULATION')

    const interesectionCellAddress = ast.args[0].reference.toSimpleCellAddress(
      state.formulaAddress
    )

    const varAssumptionCellAddresses = ast.args[1].args.map(arr => {
      return arr.map(({ reference }) =>
        reference.toSimpleCellAddress(state.formulaAddress)
      )
    })[0]

    return this.runFunction(
      ast.args,
      state,
      metadata,
      (_, varAssumption, iteration) => {
        const sheets = this.serialization.getAllSheetsSerialized()
        HyperFormula.unregisterFunction('DATA_ANALYSIS.MONTE_CARLO_SIMULATION')
        HyperFormula.unregisterFunction('D.MCS')

        const hfInstance = HyperFormula.buildFromSheets(
          sheets,
          config,
          namedExpressions
        )[0]

        const varAssumptionData = varAssumption.rawData()

        const isVarAssumptionValid = varAssumptionData.length === 1

        if (!isVarAssumptionValid) {
          return varAssumptionValuesCellError
        }

        const output = []

        for (let i = 1; i <= iteration; i++) {
          varAssumptionCellAddresses.forEach(cellAddress => {
            const formula = hfInstance.getCellFormula(cellAddress)

            hfInstance.setCellContents(cellAddress, formula)
          })

          const interesectionValue = hfInstance.getCellValue(
            interesectionCellAddress
          )

          output.push(interesectionValue)
        }

        const n = 11
        const percentiles = Array.from(
          Array(n),
          (_, number) => number / 10
        ).map(percent => {
          return [percent * 100 + '%', percentile(output, percent, false)]
        })

        const trialsOutput = output.length
        const meanOutput = mean(output)
        const medianOutput = medianFormula(output)
        const min = Math.min(...output)
        const max = Math.max(...output)
        const stdevOutput = stdev(output)
        const varianceOutput = variance(output)
        const skewnessOutput = skewnessFormula(output)
        const kurtosisOutput = kurtosisFormula(output)
        const coefficientOfVariationOutput =
          coefficientOfVariationFormula(output)
        const stDevErrorOfMeanOutput = stDevErrorOfMeanFormula(output)
        const upperLimitOutput = mean(output) + getConfidenceInterval(output)
        const lowerLimitOutput = mean(output) - getConfidenceInterval(output)

        hfInstance.destroy()

        HyperFormula.registerFunction(
          'DATA_ANALYSIS.MONTE_CARLO_SIMULATION',
          Plugin
        )
        HyperFormula.registerFunction('D.MCS', Plugin)

        return SimpleRangeValue.onlyValues([
          ['Statistic', 'Forecast values'],
          ['Trials', trialsOutput],
          ['Mean', meanOutput],
          ['Median', medianOutput],
          ['Minimum', min],
          ['Maximum', max],
          ['Standard Deviation', stdevOutput],
          ['Variance', varianceOutput],
          ['Skewness', skewnessOutput],
          ['Kurtosis', kurtosisOutput],
          ['Coeff. of Variation', coefficientOfVariationOutput],
          ['Mean Standard Error', stDevErrorOfMeanOutput],
          ['@95% Upper Limit', upperLimitOutput],
          ['@95% Lower Limit', lowerLimitOutput],
          [''],
          ['Percentile', 'Forecast values'],
          ...percentiles
        ])
      }
    )
  }

  dataAnalysisSensitivitySize() {
    return new ArraySize(7, 7)
  }

  dataAnalysisMonteCarloSize() {
    return new ArraySize(27, 27)
  }
}

Plugin.implementedFunctions = implementedFunctions
