import { SimpleRangeValue } from '@tracktak/hyperformula'
import { ArraySize } from '@tracktak/hyperformula/es/ArraySize'
import { isNil } from 'lodash-es'
import { noValueReturnedCellError } from './cellErrors'
import { sentenceCase } from 'change-case'
import getSymbolFromCurrency from 'currency-symbol-map'
import { allStatements } from './stock/financialStatementKeys'

// TODO: Could this be in hyperformula automatically?
export const inferSizeMethod = ast => {
  if (!ast.asyncPromise?.getIsResolvedValue()) {
    return ArraySize.error()
  }

  return ast.asyncPromise.resolvedValue.size ?? ArraySize.scalar()
}

const getFixedSimpleRangeValues = values => {
  // TODO: If has one length then HF is throwing errors.
  // Raise with HF as this seems to be a bug.

  return SimpleRangeValue.onlyValues(values)
}

export const getPluginAsyncValue = value => {
  if (isNil(value)) {
    return noValueReturnedCellError
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return noValueReturnedCellError
    }

    return getFixedSimpleRangeValues(value)
  }

  return value
}

export const getNewNumberFormatted = (type, value, currencyCode) => {
  if (type === 'currency') {
    return getSymbolFromCurrency(currencyCode) + value
  }
  if (type === 'percent') {
    return (value * 100).toFixed(2) + '%'
  }
  return value
}

export const convertFinancialNumbersToFormattedNumbers = data => {
  if (Array.isArray(data)) {
    return data.map(values => {
      const newValues = {}

      for (const key in values) {
        const value = values[key]
        const type = allStatements.find(x => x.field === key).type

        newValues[key] = getNewNumberFormatted(type, value, values.currencyCode)
      }

      return newValues
    })
  }

  if (data.values && data.currencyCodes) {
    const { values, currencyCodes } = data

    return values.map(({ key, value }, i) => {
      const currencyCode = currencyCodes[i]
      const type = allStatements.find(x => x.field === key).type

      return getNewNumberFormatted(type, value, currencyCode)
    })
  }

  const { key, value, currencyCode } = data
  const type = allStatements.find(x => x.field === key).type

  return getNewNumberFormatted(type, value, currencyCode)
}

export const convertEODNumbersToFormattedNumbers = (
  eodKeys,
  data,
  currencyCode
) => {
  if (isNil(data) || data.length === 0) {
    return data
  }

  if (Array.isArray(data)) {
    return data.map(values => {
      const newValues = {}

      for (const key in values) {
        const value = values[key]
        const type = eodKeys.find(x => x.field === key).type

        newValues[key] = getNewNumberFormatted(type, value, currencyCode)
      }

      return newValues
    })
  }

  const { key, value } = data
  const type = eodKeys.find(x => x.field === key).type

  return getNewNumberFormatted(type, value, currencyCode)
}

const mapObjToValues = (obj, isVertical) => {
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

const mapArrayObjectsToValues = (arr, isVertical) => {
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

export const mapValuesToArrayOfArrays = (value, isVertical) => {
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

export const timeToNumber = time => {
  return ((time.seconds / 60 + time.minutes) / 60 + time.hours) / 24
}
