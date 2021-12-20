import { CellError, ErrorType } from '@tracktak/hyperformula'

export const xMinValueCellError = new CellError(
  ErrorType.VALUE,
  'min value is not valid. Min value cannot be greater than xVar value or equal.'
)

export const xMaxValueCellError = new CellError(
  ErrorType.VALUE,
  'max value is not valid. Max value cannot be less than xVar value or equal.'
)

export const yMinValueCellError = new CellError(
  ErrorType.VALUE,
  'min value is not valid. Min value cannot be greater than yVar value or equal.'
)

export const yMaxValueCellError = new CellError(
  ErrorType.VALUE,
  'max value is not valid. Max value cannot be less than yVar value or equal.'
)

export const xMinMaxValuesCellError = new CellError(
  ErrorType.VALUE,
  'Required two min and max values. Must be {xMin,xMax}.'
)

export const yMinMaxValuesCellError = new CellError(
  ErrorType.VALUE,
  'Required two min and max values. Must be {yMin,yMax}.'
)
