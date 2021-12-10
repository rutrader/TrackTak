import { CellError, ErrorType } from '@tracktak/hyperformula'
import { snakeCase } from 'change-case'
import { fiscalDateRangeCellError, getFieldCellError } from './cellErrors'
import { convertFiscalDateRangeToFromTo } from './helpers'
import { fiscalDateRangeRegex } from './matchers'

const eodFields = [
  'date',
  'open',
  'high',
  'close',
  'adjustedClose',
  'type',
  'volume'
]

const fieldCellError = getFieldCellError(eodFields)

const granularityCellError = new CellError(
  ErrorType.VALUE,
  `granularity is not valid. Must be one of these fields: "day", "week" or "month".`
)

const convertEODGranularity = granularity => {
  if (granularity === 'week') {
    return 'w'
  }

  if (granularity === 'month') {
    return 'm'
  }

  if (granularity === 'day') {
    return 'd'
  }
}

export const getEODParams = (granularity, field, fiscalDateRange) => {
  const params = {}

  if (granularity) {
    params.period = convertEODGranularity(granularity)
  }

  if (field) {
    params.filter = snakeCase(field)
  }

  if (fiscalDateRange) {
    const { from, to } = convertFiscalDateRangeToFromTo(fiscalDateRange)

    params.from = from
    params.to = to
  }

  return params
}

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
