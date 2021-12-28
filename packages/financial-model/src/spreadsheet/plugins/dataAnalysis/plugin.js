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
        greaterThan: 0
      }
    ]
  }
}

export const aliases = {
  'D.SA': 'DATA_ANALYSIS.SENSITIVITY_ANALYSIS',
  'D.MCS': 'DATA_ANALYSIS.MONTE_CARLO_SIMULATION'
}

export const translations = {
  enGB: aliases
}

const getLowerUpperHalves = (midPoint, minPoint) => {
  const lowerHalfPoint = (midPoint - minPoint) / 2 + minPoint
  const upperHalfPoint = midPoint - lowerHalfPoint + midPoint

  const truncatelowerHalfPoint = truncateDecimal(lowerHalfPoint, 2)
  const truncateUpperHalfPoint = truncateDecimal(upperHalfPoint, 2)

  return { truncatelowerHalfPoint, truncateUpperHalfPoint }
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
          Plugin,
          translations
        )
        HyperFormula.registerFunction('D.SA', Plugin, translations)

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

    return this.runFunction(ast.args, state, metadata, (_, varAssumption) => {
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

      for (let i = 1; i <= 100; i++) {
        varAssumptionCellAddresses.forEach(cellAddress => {
          const formula = hfInstance.getCellFormula(cellAddress)

          hfInstance.setCellContents(cellAddress, formula)
        })

        const interesectionValue = hfInstance.getCellValue(
          interesectionCellAddress
        )

        output.push([interesectionValue])
      }

      hfInstance.destroy()

      HyperFormula.registerFunction(
        'DATA_ANALYSIS.MONTE_CARLO_SIMULATION',
        Plugin,
        translations
      )
      HyperFormula.registerFunction('D.MCS', Plugin, translations)

      return SimpleRangeValue.onlyValues(output)
    })
  }

  dataAnalysisSensitivitySize() {
    return new ArraySize(7, 7)
  }

  dataAnalysisMonteCarloSize() {
    return new ArraySize(1, 100)
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
