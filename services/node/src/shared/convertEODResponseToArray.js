const convertEODResponseToArray = (value, filter) => {
  if (value === null || value === undefined) {
    return value
  }

  if (Array.isArray(value)) {
    if (typeof value[0] !== 'object') {
      return value.map(property => ({
        [filter]: property
      }))
    }

    return value
  }

  return [
    {
      [filter]: value
    }
  ]
}

export default convertEODResponseToArray
