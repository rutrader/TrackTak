import {
  FunctionPlugin,
  HyperFormula,
  SimpleRangeValue
} from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { ArraySize } from '@tracktak/hyperformula/es/ArraySize'

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
        argumentType: ArgumentTypes.RANGE,
        optionalArg: true
      },
      {
        argumentType: ArgumentTypes.RANGE,
        optionalArg: true
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
//TO DO
export const getLowerUpperSliderHalves = (minPoint, midPoint) => {
  const lowerHalfPoint = (midPoint - minPoint) / 2 + minPoint
  const upperHalfPoint = midPoint - lowerHalfPoint + midPoint

  return { lowerHalfPoint, upperHalfPoint }
}

const fixData = data => {
  // return data.map(datum => roundDecimal(datum, 2))
}

export const getSliderValuesFromMinMax = (minPoint, maxPoint) => {
  const length = maxPoint - minPoint
  const midPoint = length / 2 + minPoint
  const { lowerHalfPoint, upperHalfPoint } = getLowerUpperSliderHalves(
    minPoint,
    midPoint
  )

  const data = fixData([
    minPoint,
    lowerHalfPoint,
    midPoint,
    upperHalfPoint,
    maxPoint
  ])

  return data
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
      (_, __, ___, xRange, yRange) => {
        const sheets = this.serialization.getAllSheetsSerialized()
        const hfInstance = HyperFormula.buildFromSheets(sheets)[0]

        const xRangeValues = xRange.rawData()[0]
        const yRangeValues = yRange.rawData()[0]

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
    return new ArraySize(4, 4)
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
