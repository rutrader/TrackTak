import { standardizedMoment } from './spreadsheet/plugins/dataAnalysis/plugin'
import {
  uniformInvMinCellError,
  triangularInvMaxCellError,
  triangularInvMostLikelyMaxCellError,
  triangularInvMostLikelyMinCellError
} from './spreadsheet/plugins/statistics/cellErrors'

export const triangularInvFormula = (random, lowerBound, upperBound, mode) => {
  if (upperBound <= lowerBound) {
    return triangularInvMaxCellError
  }

  if (mode < lowerBound) {
    return triangularInvMostLikelyMinCellError
  }

  if (mode > upperBound) {
    return triangularInvMostLikelyMaxCellError
  } else {
    if (random <= (mode - lowerBound) / (upperBound - lowerBound)) {
      return (
        lowerBound +
        (upperBound - lowerBound) *
          Math.sqrt(random * ((mode - lowerBound) / (upperBound - lowerBound)))
      )
    } else {
      return (
        lowerBound +
        (upperBound - lowerBound) *
          (1 -
            Math.sqrt(
              (1 - random) *
                (1 - (mode - lowerBound) / (upperBound - lowerBound))
            ))
      )
    }
  }
}

export const uniformInvDistFormula = (random, min, max) => {
  if (min >= max) {
    return uniformInvMinCellError
  }

  return min + random * (max - min)
}

export const medianFormula = values => {
  values.sort((a, b) => a - b)
  if (values.length % 2 === 0) {
    return (values[values.length / 2 - 1] + values[values.length / 2]) / 2
  } else {
    return values[Math.floor(values.length / 2)]
  }
}

export const skewnessFormula = arrVector => {
  return standardizedMoment(arrVector, 3)
}

export const kurtosisFormula = arrVector => {
  return standardizedMoment(arrVector, 4) - 3
}

export const confidenceIntervalFormula = (stDevErrorOfMean, zScore) => {
  return stDevErrorOfMean * zScore
}
