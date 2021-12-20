import {
  FunctionPlugin,
  HyperFormula,
  SimpleRangeValue
} from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { ArraySize } from '@tracktak/hyperformula/es/ArraySize'
import roundDecimal from '../../shared/roundDecimal'
import {
  xMaxValueCellError,
  xMinMaxValuesCellError,
  xMinValueCellError,
  yMaxValueCellError,
  yMinMaxValuesCellError,
  yMinValueCellError
} from './cellErrors'

export const implementedFunctions = {
  'DATA_ANALYSIS.SENSITIVITY_ANALYSIS': {
    method: 'sensitivityAnalysis',
    arraySizeMethod: 'dataAnalysisSize',
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
  }
}

export const aliases = {
  'DA.SA': 'DATA_ANALYSIS.SENSITIVITY_ANALYSIS'
}

export const translations = {
  enGB: aliases
}

const getLowerUpperHalves = (midPoint, minPoint) => {
  const lowerHalfPoint = (midPoint - minPoint) / 2 + minPoint
  const upperHalfPoint = midPoint - lowerHalfPoint + midPoint

  return { lowerHalfPoint, upperHalfPoint }
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
        const hfInstance = HyperFormula.buildFromSheets(sheets)[0]

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

        const isXMinValid = xVar >= xMinValue
        const isXMaxValid = xVar <= xMaxValue

        if (!isXMinValid) {
          return xMinValueCellError
        }

        if (!isXMaxValid) {
          return xMaxValueCellError
        }

        const isYMinValid = yVar >= yMinValue
        const isYMaxValid = yVar <= yMaxValue

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
          xLowerUpper.lowerHalfPoint,
          xVar,
          xLowerUpper.upperHalfPoint,
          xMaxValue
        ]
        const yRangeValues = [
          yMinValue,
          yLowerUpper.lowerHalfPoint,
          yVar,
          yLowerUpper.upperHalfPoint,
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

        return SimpleRangeValue.onlyValues(intersectionPointValues)
      }
    )
  }

  dataAnalysisSize() {
    return new ArraySize(7, 7)
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
