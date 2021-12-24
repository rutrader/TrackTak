import {
  uniformInvMinCellError,
  triangularInvMaxCellError,
  triangularInvMostLikelyMaxCellError,
  triangularInvMostLikelyMinCellError
} from './cellErrors'

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
