import camelCase from 'camelcase'
import { isNil } from 'lodash-es'
import { isEODQueryFromModified } from '../api/v1/securities/alterFromToQuery'

const convertEODFromAPI = (data, query) => {
  let newData = data

  if (isEODQueryFromModified(query)) {
    const key = camelCase(query.filter)

    newData = {
      key,
      value: data[0][key]
    }
  }

  return newData
}

export const divideEODNumbersByHundred = data => {
  const getModifiedValue = value =>
    isNil(value) ? value : parseFloat((value / 100).toFixed(5))

  if (Array.isArray(data)) {
    return data?.map(value => {
      return {
        ...value,
        open: getModifiedValue(value.open),
        high: getModifiedValue(value.high),
        low: getModifiedValue(value.low),
        close: getModifiedValue(value.close),
        adjustedClose: getModifiedValue(value.adjustedClose)
      }
    })
  }

  return { ...data, value: getModifiedValue(data.value) }
}

export default convertEODFromAPI
