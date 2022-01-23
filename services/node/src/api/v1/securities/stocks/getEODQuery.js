import { snakeCase } from 'change-case'
import { convertFiscalDateRangeToFromTo } from '../helpers'

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

const getEODQuery = ({ field, granularity, fiscalDateRange }) => {
  const query = {}

  if (granularity) {
    query.period = convertEODGranularity(granularity)
  }

  if (field) {
    query.filter = snakeCase(field)
  }

  if (fiscalDateRange) {
    const { from, to } = convertFiscalDateRangeToFromTo(fiscalDateRange)

    query.from = from
    query.to = to
  }

  return query
}

export default getEODQuery
