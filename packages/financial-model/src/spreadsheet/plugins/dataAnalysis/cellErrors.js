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

export const varCellReferencesCellError = new CellError(
  ErrorType.VALUE,
  'varCellReferences(s) are not valid. The parameter varCellReferences accepts a single array. Must be {cell1,cell2,...etc.}.'
)

export const varAssumptionsCellError = new CellError(
  ErrorType.VALUE,
  'varAssumption(s) are not valid. The parameter varAssumption accepts a single array. Must be {assumption1,assumption2,...etc.}.'
)

export const varAssumptionReferencesMatchCellError = new CellError(
  ErrorType.VALUE,
  'varCellReferences(s) length is not the same as varAssumption(s). The number of arguments passed into varCellReferences(s) and varAssumption(s) must be the same.'
)
