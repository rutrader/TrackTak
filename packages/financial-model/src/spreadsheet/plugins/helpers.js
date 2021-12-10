import { CellError, SimpleRangeValue } from '@tracktak/hyperformula'
import { ArraySize } from '@tracktak/hyperformula/es/ArraySize'
import dayjs from 'dayjs'
import { sentenceCase } from 'change-case'

const parseFiscalDateFromRange = fiscalDateRange => {
  if (fiscalDateRange.charAt(0) === '>') {
    const fiscalDate = fiscalDateRange.slice(1)

    return [fiscalDate, '>']
  }

  if (fiscalDateRange.charAt(0) === '<') {
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
  const fiscalDateRangeFilterPredicate = ({ date }, _, arr) => {
    // Handles cases such as ttm dates for financials
    const realDate = dayjs(date).isValid() ? date : arr[0].date

    if (operator === '>') {
      return dayjs(realDate).isAfter(fiscalDate)
    }

    if (operator === '<') {
      return dayjs(realDate).isBefore(fiscalDate)
    }

    if (operator === ';') {
      return dayjs(realDate).isBetween(fiscalDate[0], fiscalDate[1])
    }

    return dayjs(realDate).isSame(fiscalDate, 'day')
  }

  return fiscalDateRangeFilterPredicate
}

export const convertFiscalDateRangeToFromTo = fiscalDateRange => {
  const [fiscalDate, operator] = parseFiscalDateFromRange(fiscalDateRange)

  if (operator === '>') {
    return {
      from: fiscalDate
    }
  }

  if (operator === '<') {
    return {
      to: fiscalDate
    }
  }

  if (operator === ';') {
    const from = fiscalDate[0]
    const to = fiscalDate[1]

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

export const mapObjToSimpleRangeValues = (obj, isVertical) => {
  let values = []

  if (isVertical) {
    const keys = Object.keys(obj).map(key => sentenceCase(key))

    values[0] = keys

    Object.values(obj).forEach((objValues, i) => {
      objValues.forEach((value, j) => {
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

  return SimpleRangeValue.onlyValues(values)
}

export const mapArrayObjectsToSimpleRangeValues = (arr, isVertical) => {
  const rows = {}

  Object.keys(arr[0]).map(key => {
    rows[key] = []
  })

  arr.forEach(statement => {
    Object.entries(statement).forEach(([key, value]) => {
      rows[key].push(value)
    })
  })

  return mapObjToSimpleRangeValues(rows, isVertical)
}

export const getFieldValue = (value, isVertical) => {
  if (Array.isArray(value)) {
    if (typeof value[0] === 'object') {
      return mapArrayObjectsToSimpleRangeValues(value, isVertical)
    } else {
      return SimpleRangeValue.onlyValues(
        isVertical ? value.map(x => [x]) : [value]
      )
    }
  }

  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return mapObjToSimpleRangeValues(value, isVertical)
  }

  return value
}

// TODO: Could this be in hyperformula automatically?
export const sizeMethod = state => {
  const cellValue = state.formulaVertex?.getCellValue()

  if (!state.formulaVertex || cellValue instanceof CellError) {
    return ArraySize.error()
  }

  if (cellValue instanceof SimpleRangeValue) {
    const arraySize = new ArraySize(cellValue.width(), cellValue.height())

    return arraySize
  }

  return ArraySize.scalar()
}
