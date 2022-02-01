import { CellError, ErrorType } from '@tracktak/hyperformula'

export const xMinValueCellError = new CellError(
  ErrorType.VALUE,
  'xMin value is not valid. Min value cannot be greater than xVar value or equal.'
)

export const xMaxValueCellError = new CellError(
  ErrorType.VALUE,
  'xMax value is not valid. Max value cannot be less than xVar value or equal.'
)

export const yMinValueCellError = new CellError(
  ErrorType.VALUE,
  'yMin value is not valid. Min value cannot be greater than yVar value or equal.'
)

export const yMaxValueCellError = new CellError(
  ErrorType.VALUE,
  'yMax value is not valid. Max value cannot be less than yVar value or equal.'
)

export const varAssumptionValuesCellError = new CellError(
  ErrorType.VALUE,
  'varAssumption(s) are not valid. The parameter varAssumption accepts a single array. Must be {assumption1,assumption2,...etc.}.'
)
