import camelCase from 'camelcase'

export const camelCaseObject = (obj, topLevelKey) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  const returnedObj = {}
  const returnedArr = []

  try {
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      const camelCaseKey = camelCase(key, {
        preserveConsecutiveUppercase: true
      })

      if (typeof value === 'object' && value !== null) {
        const camelCaseObj = camelCaseObject(value, camelCaseKey)

        if (isNaN(parseInt(key))) {
          returnedObj[camelCaseKey] = camelCaseObj
        } else {
          returnedArr.push(camelCaseObj)
        }
      } else {
        returnedObj[camelCaseKey] = value
      }
    })
  } catch (error) {
    console.error(
      `camelCase error thrown for key: ${topLevelKey}. Ignoring key.`
    )
    console.error(error)
  }

  return returnedArr.length ? returnedArr : returnedObj
}

const camelCaseObjects = value => {
  if (Array.isArray(value)) {
    return value.map(obj => camelCaseObject(obj))
  }

  if (typeof value !== 'object' || value === null) {
    return value
  }

  return camelCaseObject(value)
}

export default camelCaseObjects
