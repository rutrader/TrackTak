import { CellError, ErrorType } from '@tracktak/hyperformula'

export const uniformInvMinCellError = new CellError(
  ErrorType.VALUE,
  'min parameter is not valid. Min variable must be less than max.'
)

export const triangularInvMaxCellError = new CellError(
  ErrorType.VALUE,
  'max parameter is not valid. Max variable must be greater than min.'
)

export const triangularInvMostLikelyMaxCellError = new CellError(
  ErrorType.VALUE,
  'mostLikely parameter is not valid. MostLikely variable must be less than or equal to max.'
)

export const triangularInvMostLikelyMinCellError = new CellError(
  ErrorType.VALUE,
  'mostLikely parameter is not valid. MostLikely variable must be greater than or equal to min.'
)
