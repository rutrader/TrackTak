const convertEODFromAPI = (data, field) => {
  const yieldFields = ['open', 'high', 'low', 'close', 'adjustedClose']

  if (Array.isArray(data)) {
    return data.map(value => {
      if (field) {
        if (yieldFields.some(x => x === field)) {
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

  if (yieldFields.some(x => x === field)) {
    return data / 100
  }

  return data
}

export default convertEODFromAPI
