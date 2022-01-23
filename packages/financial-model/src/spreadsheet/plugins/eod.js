import { CellError, ErrorType } from '@tracktak/hyperformula'
import { fiscalDateRangeCellError, getFieldCellError } from './cellErrors'
import { fiscalDateRangeRegex } from './matchers'

export const getEodKeys = type => [
  { field: 'date' },
  { type, field: 'open' },
  { type, field: 'high' },
  { type, field: 'close' },
  { type, field: 'adjustedClose' },
  { type, field: 'low' },
  { field: 'volume' }
]

const eodFields = getEodKeys().map(x => x.field)

const fieldCellError = getFieldCellError(eodFields)

const granularityCellError = new CellError(
  ErrorType.VALUE,
  `granularity is not valid. Must be one of these fields: "day", "week" or "month".`
)

export const validateEODParamsHasError = (
  field,
  granularity,
  fiscalDateRange
) => {
  const isFieldValid = field ? !!eodFields.find(x => x === field) : true
  const isGranularityValid = granularity
    ? granularity === 'day' || granularity === 'week' || granularity === 'month'
    : true
  const isFiscalDateRangeValid = fiscalDateRange
    ? !!fiscalDateRange.match(fiscalDateRangeRegex)
    : true

  if (!isFieldValid) {
    return fieldCellError
  }

  if (!isGranularityValid) {
    return granularityCellError
  }

  if (!isFiscalDateRangeValid) {
    return fiscalDateRangeCellError
  }
}
