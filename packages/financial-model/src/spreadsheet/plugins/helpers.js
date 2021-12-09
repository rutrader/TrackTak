import { CellError, SimpleRangeValue } from '@tracktak/hyperformula'
import { ArraySize } from '@tracktak/hyperformula/es/ArraySize'
import { sentenceCase } from 'sentence-case'

export const mapObjToSimpleRangeValues = obj => {
  const values = Object.entries(obj).map(([key, value]) => [
    sentenceCase(key),
    ...(Array.isArray(value) ? value : [value])
  ])

  return SimpleRangeValue.onlyValues(values)
}

export const mapArrayObjectsToSimpleRangeValues = arr => {
  const rows = {}

  Object.keys(arr[0]).map(key => {
    rows[key] = []
  })

  arr.forEach(statement => {
    Object.entries(statement).forEach(([key, value]) => {
      rows[key].push(value)
    })
  })

  return mapObjToSimpleRangeValues(rows)
}

export const getFieldValue = value => {
  if (Array.isArray(value)) {
    return mapArrayObjectsToSimpleRangeValues(value)
  }

  if (typeof value === 'object' && value !== null) {
    return mapObjToSimpleRangeValues(value)
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
