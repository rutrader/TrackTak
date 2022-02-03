import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { ArraySize } from '@tracktak/hyperformula/es/ArraySize'
import {
  normal,
  lognormal
} from '@tracktak/hyperformula/es/interpreter/plugin/3rdparty/jstat/jstat'
import {
  triangularInvFormula,
  uniformInvDistFormula
} from '../../../statsFormulas'
import Rand, { PRNG } from 'rand-seed'
import { FunctionPlugin } from '@tracktak/hyperformula'

const rand = new Rand(undefined, PRNG.mulberry32)

export const implementedFunctions = {
  'STATISTICS.NORMAL_INVERSE_RANDOM': {
    method: 'normalInverseRandom',
    arraySizeMethod: 'statisticsSize',
    isVolatile: true,
    parameters: [
      { argumentType: ArgumentTypes.NUMBER },
      { argumentType: ArgumentTypes.NUMBER, greaterThan: 0 }
    ]
  },
  'STATISTICS.UNIFORM_INVERSE_RANDOM': {
    method: 'uniformInverseRandom',
    arraySizeMethod: 'statisticsSize',
    isVolatile: true,
    parameters: [
      { argumentType: ArgumentTypes.NUMBER },
      { argumentType: ArgumentTypes.NUMBER }
    ]
  },
  'STATISTICS.TRIANGULAR_INVERSE_RANDOM': {
    method: 'triangularInverseRandom',
    arraySizeMethod: 'statisticsSize',
    isVolatile: true,
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
  'STATISTICS.LOGNORMAL_INVERSE_RANDOM': {
    method: 'lognormalInverseRandom',
    arraySizeMethod: 'statisticsSize',
    isVolatile: true,
    parameters: [
      { argumentType: ArgumentTypes.NUMBER },
      { argumentType: ArgumentTypes.NUMBER, greaterThan: 0 }
    ]
  }
}

export const translations = {
  enGB: {
    'STATISTICS.NORMAL_INVERSE_RANDOM': 'STATISTICS.NORMAL_INVERSE_RANDOM',
    'STATISTICS.UNIFORM_INVERSE_RANDOM': 'STATISTICS.UNIFORM_INVERSE_RANDOM',
    'STATISTICS.TRIANGULAR_INVERSE_RANDOM':
      'STATISTICS.TRIANGULAR_INVERSE_RANDOM',
    'STATISTICS.LOGNORMAL_INVERSE_RANDOM': 'STATISTICS.LOGNORMAL_INVERSE_RANDOM'
  }
}

export class Plugin extends FunctionPlugin {
  normalInverseRandom(ast, state) {
    const metadata = this.metadata('STATISTICS.NORMAL_INVERSE_RANDOM')

    return this.runFunction(
      ast.args,
      state,
      metadata,
      (mean, standardDeviation) => {
        const normalInvValue = normal.inv(rand.next(), mean, standardDeviation)

        return normalInvValue
      }
    )
  }

  uniformInverseRandom(ast, state) {
    const metadata = this.metadata('STATISTICS.UNIFORM_INVERSE_RANDOM')

    return this.runFunction(ast.args, state, metadata, (min, max) => {
      const uniformInvDistValue = uniformInvDistFormula(
        rand.next(),
        Math.min(min),
        Math.min(max)
      )

      return uniformInvDistValue
    })
  }

  triangularInverseRandom(ast, state) {
    const metadata = this.metadata('STATISTICS.TRIANGULAR_INVERSE_RANDOM')

    return this.runFunction(
      ast.args,
      state,
      metadata,
      (min, mostLikely, max) => {
        const triangularInvValue = triangularInvFormula(
          rand.next(),
          min,
          max,
          mostLikely
        )

        return triangularInvValue
      }
    )
  }

  lognormalInverseRandom(ast, state) {
    const metadata = this.metadata('STATISTICS.LOGNORMAL_INVERSE_RANDOM')

    return this.runFunction(
      ast.args,
      state,
      metadata,
      (mean, standardDeviation) => {
        const lognormalInvValue = lognormal.inv(
          rand.next(),
          mean,
          standardDeviation
        )

        return lognormalInvValue
      }
    )
  }

  statisticsSize() {
    return new ArraySize(1, 1)
  }
}

Plugin.implementedFunctions = implementedFunctions
