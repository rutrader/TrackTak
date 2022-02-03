import {
  minCellError,
  maxCellError,
  mostLikelyMaxCellError,
  mostLikelyMinCellError
} from './spreadsheet/plugins/statistics/cellErrors'
import {
  mean,
  stdev
} from '@tracktak/hyperformula/es/interpreter/plugin/3rdparty/jstat/jstat'

export const standardizedMoment = (arr, n) => {
  const mu = mean(arr)
  const sigma = stdev(arr)
  const length = arr.length
  let skewSum = 0

  for (let i = 0; i < length; i++) skewSum += Math.pow((arr[i] - mu) / sigma, n)

  return skewSum / arr.length
}

export const triangularInvFormula = (random, lowerBound, upperBound, mode) => {
  if (upperBound <= lowerBound) {
    return maxCellError
  }

  if (mode < lowerBound) {
    return mostLikelyMinCellError
  }

  if (mode > upperBound) {
    return mostLikelyMaxCellError
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
    return minCellError
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
