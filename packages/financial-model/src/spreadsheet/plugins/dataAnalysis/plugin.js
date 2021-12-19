import {
  FunctionPlugin,
  HyperFormula,
  SimpleRangeValue
} from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { ArraySize } from '@tracktak/hyperformula/es/ArraySize'
import roundDecimal from '../../shared/roundDecimal'

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

  roundDecimal(lowerHalfPoint, 2)
  roundDecimal(upperHalfPoint, 2)

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

        const xMinValue = xMinMaxData[0][0]
        const yMinValue = yMinMaxData[0][0]

        const xMaxValue = xMinMaxData[0][1]
        const yMaxValue = yMinMaxData[0][1]

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

        const intersectionPointValues = xRangeValues.map(xValue => {
          hfInstance.setCellContents(xVarCellReference, xValue)

          return yRangeValues.map(yValue => {
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
