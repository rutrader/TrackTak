const getConvertedIndustryAverages = industryAverages => {
  return industryAverages.map(industryAverage => {
    const industryAverageObject = {}

    Object.keys(industryAverage).forEach(key => {
      const value = industryAverage[key]

      if (typeof value === 'string') {
        const parsedNumber = parseFloat(value)

        industryAverageObject[key] = isNaN(parsedNumber)
          ? value
          : parsedNumber / 100
      } else {
        industryAverageObject[key] = value
      }
    })

    return industryAverageObject
  })
}

export default getConvertedIndustryAverages
