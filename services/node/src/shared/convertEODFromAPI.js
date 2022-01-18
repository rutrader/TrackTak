import { isEODQueryFromModified } from '../api/v1/securities/alterFromToQuery'

const convertEODFromAPI = (data, query) => {
  let newData = data

  if (isEODQueryFromModified(query)) {
    newData = data[0]
  }

  return newData
}

export const divideEODYieldsByHundred = (data, query) => {
  const yieldFields = ['open', 'high', 'low', 'close', 'adjustedClose']

  if (Array.isArray(data)) {
    return data.map(value => {
      if (query.field) {
        if (yieldFields.some(x => x === query.field)) {
          return value / 100
        }
        return value
      }
      return {
        ...value,
        open: value.open / 100,
        high: value.high / 100,
        low: value.low / 100,
        close: value.close / 100,
        adjustedClose: value.adjustedClose / 100
      }
    })
  }

  if (yieldFields.some(x => x === query.field)) {
    return data / 100
  }

  return data
}

export default convertEODFromAPI
