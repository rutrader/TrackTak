import { SimpleRangeValue } from '@tracktak/hyperformula'
import { StatisticalPlugin } from '@tracktak/hyperformula/es/interpreter/plugin/StatisticalPlugin'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { ArraySize } from '@tracktak/hyperformula/es/ArraySize'
import { normal } from '@tracktak/hyperformula/es/interpreter/plugin/3rdparty/jstat/jstat'

export const implementedFunctions = {
  'STATISTICS.NORMAL_INVERSE_RANDOM': {
    method: 'normalInverseRandom',
    arraySizeMethod: 'statisticsSize',
    parameters: [
      { argumentType: ArgumentTypes.NUMBER },
      { argumentType: ArgumentTypes.NUMBER, greaterThan: 0 }
    ]
  },
  'STATISTICS.UNIFORM_RANDOM': {
    method: 'uniformRandom',
    arraySizeMethod: 'statisticsSize',
    parameters: [
      { argumentType: ArgumentTypes.NUMBER },
      { argumentType: ArgumentTypes.NUMBER }
    ]
  },
  'STATISTICS.TRIANGULAR_RANDOM': {
    method: 'triangularRandom',
    arraySizeMethod: 'statisticsSize',
    parameters: [
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
  'STATISTICS.DISCRETE_RANDOM': {
    method: 'discreteRandom',
    arraySizeMethod: 'statisticsSize',
    parameters: [
      {
        argumentType: ArgumentTypes.RANGE
      },
      {
        argumentType: ArgumentTypes.INTEGER
      }
    ]
  }
}

export const aliases = {
  'S.NIR': 'STATISTICS.NORMAL_INVERSE_RANDOM',
  'S.UR': 'STATISTICS.UNIFORM_RANDOM',
  'S.TR': 'STATISTICS.TRIANGULAR_RANDOM',
  'S.DR': 'STATISTICS.DISCRETE_RANDOM'
}

export const translations = {
  enGB: aliases
}

export class Plugin extends StatisticalPlugin {
  normalInverseRandom(ast, state) {
    const metadata = this.metadata('STATISTICS.NORMAL_INVERSE_RANDOM')

    return this.runFunction(
      ast.args,
      state,
      metadata,
      (mean, standardDeviation) => {
        const normalinvValue = normal.inv(
          Math.random(),
          mean,
          standardDeviation
        )

        return normalinvValue
      }
    )
  }

  uniformRandom(ast, state) {
    const metadata = this.metadata('STATISTICS.UNIFORM_RANDOM')

    return this.runFunction(ast.args, state, metadata, (min, max) => {
      const uniformDistFormula = (random, min, max) => {
        return min + random * (max - min)
      }

      const uniformDistValue = uniformDistFormula(
        Math.random(),
        Math.min(min),
        Math.min(max)
      )

      return uniformDistValue
    })
  }

  triangularRandom(ast, state) {
    const metadata = this.metadata('STATISTICS.TRIANGULAR_RANDOM')

    return this.runFunction(
      ast.args,
      state,
      metadata,
      (min, mostLikely, max) => {
        return SimpleRangeValue.onlyValues()
      }
    )
  }

  discreteRandom(ast, state) {
    const metadata = this.metadata('STATISTICS.DISCRETE_RANDOM')

    return this.runFunction(
      ast.args,
      state,
      metadata,
      (values, probabilities) => {
        return SimpleRangeValue.onlyValues()
      }
    )
  }

  statisticsSize() {
    return new ArraySize(1, 1)
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
