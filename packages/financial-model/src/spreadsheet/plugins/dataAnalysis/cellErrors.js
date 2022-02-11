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

export const intersectionCellReferenceError = new CellError(
  ErrorType.VALUE,
  'intersectionCellReference is not valid. This parameter accepts a cell reference type. E.g. A1'
)

export const xVarCellReferencesCellError = new CellError(
  ErrorType.VALUE,
  'xVar is not valid. This parameter accepts a cell reference type. E.g. A1'
)

export const yVarCellReferencesCellError = new CellError(
  ErrorType.VALUE,
  'yVar is not valid. This parameter accepts a cell reference type. E.g. A1'
)

export const varCellReferencesCellError = new CellError(
  ErrorType.VALUE,
  'varCellReferences are not valid. This parameter accepts a single array of type cell references. E.g. {A1,A2,...etc.}.'
)

export const varAssumptionsCellError = new CellError(
  ErrorType.VALUE,
  'varAssumptions are not valid. This parameter accepts a single array of type cell references. E.g. {A1,A2,...etc.}.'
)

export const varAssumptionReferencesMatchCellError = new CellError(
  ErrorType.VALUE,
  'varCellReferences length is not the same as varAssumptions. The number of arguments passed into varCellReferences and varAssumptions must be the same.'
)

export const getVarAssumptionNotValidTypeError = (addressString, value) =>
  new CellError(
    ErrorType.VALUE,
    `varAssumption value ${value} in cell address ${addressString} is not a valid formula. E.g. =STATISTICS.NORMAL_INVERSE_RANDOM(20%, 2%)`
  )
