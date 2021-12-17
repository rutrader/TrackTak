import dayjs from 'dayjs'
import { sentenceCase } from 'change-case'

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

  if (fiscalDateRange.includes(';')) {
    const fiscalDates = fiscalDateRange.split(';')

    return [fiscalDates, ';']
  }

  return [fiscalDateRange]
}

export const getFiscalDateRangeFilterPredicate = fiscalDateRange => {
  const [fiscalDate, operator] = parseFiscalDateFromRange(fiscalDateRange)
  const fiscalDateRangeFilterPredicate = ({ date }, i, arr) => {
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

    return dayjs(realDate).isSame(fiscalDate, 'day')
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

  if (operator === ';') {
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

export const mapObjToValues = (obj, isVertical) => {
  let values = []

  if (isVertical) {
    const keys = Object.keys(obj).map(key => sentenceCase(key))

    values[0] = keys

    Object.values(obj).forEach((objValues, i) => {
      const newObjValues = Array.isArray(objValues) ? objValues : [objValues]

      newObjValues.forEach((value, j) => {
        const newIndex = j + 1

        if (i === 0) {
          values[newIndex] = []
        }

        values[newIndex].push(value)
      })
    })
  } else {
    values = Object.entries(obj).map(([key, value]) => [
      sentenceCase(key),
      ...(Array.isArray(value) ? value : [value])
    ])
  }

  return values
}

export const mapArrayObjectsToValues = (arr, isVertical) => {
  const rows = {}

  Object.keys(arr[0]).map(key => {
    rows[key] = []
  })

  arr.forEach(statement => {
    Object.entries(statement).forEach(([key, value]) => {
      rows[key].push(value)
    })
  })

  return mapObjToValues(rows, isVertical)
}

export const getFieldValue = (value, isVertical) => {
  if (Array.isArray(value)) {
    if (!value.length) {
      return null
    }

    if (typeof value[0] === 'object') {
      return mapArrayObjectsToValues(value, isVertical)
    } else {
      return isVertical ? value.map(x => [x]) : [value]
    }
  }

  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    if (Object.keys(value).length === 0) {
      return null
    }

    return mapObjToValues(value, isVertical)
  }

  return value ?? null
}
