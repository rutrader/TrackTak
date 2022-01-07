import { CellError, ErrorType } from '@tracktak/hyperformula'

export const minCellError = new CellError(
  ErrorType.VALUE,
  'min parameter is not valid. Min variable must be less than max.'
)

export const maxCellError = new CellError(
  ErrorType.VALUE,
  'max parameter is not valid. Max variable must be greater than min.'
)

export const mostLikelyMaxCellError = new CellError(
  ErrorType.VALUE,
  'mostLikely parameter is not valid. MostLikely variable must be less than or equal to max.'
)

export const mostLikelyMinCellError = new CellError(
  ErrorType.VALUE,
  'mostLikely parameter is not valid. MostLikely variable must be greater than or equal to min.'
)
