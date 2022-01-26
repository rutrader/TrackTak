import dayjs from 'dayjs'

export const parseFiscalDateFromRange = fiscalDateRange => {
  if (fiscalDateRange.includes('>=')) {
    const fiscalDate = fiscalDateRange.slice(2)

    return [fiscalDate, '>=']
  }

  if (fiscalDateRange.includes('<=')) {
    const fiscalDate = fiscalDateRange.slice(2)

    return [fiscalDate, '<=']
  }

  if (fiscalDateRange.includes('>')) {
    const fiscalDate = fiscalDateRange.slice(1)

    return [fiscalDate, '>']
  }

  if (fiscalDateRange.includes('<')) {
    const fiscalDate = fiscalDateRange.slice(1)

    return [fiscalDate, '<']
  }

  if (fiscalDateRange.includes(':')) {
    const fiscalDates = fiscalDateRange.split(':')

    return [fiscalDates, ':']
  }

  return [fiscalDateRange]
}

export const getFiscalDateRangeFilterPredicate = (fiscalDate, operator) => {
  const fiscalDateRangeFilterPredicate = ({ date }, _, arr) => {
    // Handles cases such as ttm dates for financials
    const realDate = dayjs(date).isValid() ? date : arr[0].date

    if (operator === '>') {
      return dayjs(realDate).isAfter(fiscalDate)
    }

    if (operator === '>=') {
      return dayjs(realDate).add(1, 'day').isAfter(fiscalDate)
    }

    if (operator === '<') {
      return dayjs(realDate).isBefore(fiscalDate)
    }

    if (operator === '<=') {
      return dayjs(realDate).subtract(1, 'day').isBefore(fiscalDate)
    }

    if (operator === ':') {
      return dayjs(realDate).isBetween(fiscalDate[0], fiscalDate[1])
    }

    // Get before date instead of same date as we match the nearest
    // available one
    return dayjs(realDate).subtract(1, 'day').isBefore(fiscalDate)
  }

  return fiscalDateRangeFilterPredicate
}

const addOneDay = fiscalDate =>
  dayjs(fiscalDate).add(1, 'day').format('YYYY-MM-DD')

const subtractOneDay = fiscalDate =>
  dayjs(fiscalDate).subtract(1, 'day').format('YYYY-MM-DD')

export const convertFiscalDateRangeToFromTo = fiscalDateRange => {
  const [fiscalDate, operator] = parseFiscalDateFromRange(fiscalDateRange)

  // EOD API filter is inclusive so we need to make it exclusive
  if (operator === '>') {
    return {
      from: addOneDay(fiscalDate)
    }
  }

  if (operator === '>=') {
    return {
      from: fiscalDate
    }
  }

  if (operator === '<') {
    return {
      to: subtractOneDay(fiscalDate)
    }
  }

  if (operator === '<=') {
    return {
      to: fiscalDate
    }
  }

  if (operator === ':') {
    const from = addOneDay(fiscalDate[0])
    const to = subtractOneDay(fiscalDate[1])

    return {
      from,
      to
    }
  }

  return {
    from: fiscalDate,
    to: fiscalDate
  }
}
