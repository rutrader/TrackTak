import { isNil } from 'lodash-es'
import gicSubIndustryMappingJson from '../data/gicSubIndustryMapping.json'
import getIsStockInUS from './getIsStockInUS'
import industryAverage from './industryAverage'
import industryMapping, { spaceRegex } from './industryMappings'

const getCurrentIndustry = fundamentals => {
  const { gicSubIndustry, industry } = fundamentals.general

  let mappedCurrentIndustry

  if (!isNil(gicSubIndustry)) {
    mappedCurrentIndustry = gicSubIndustryMappingJson[gicSubIndustry.trim()]
  }

  // TODO: Add sentry warning later
  // Some stocks do not have a gicSubIndustry so fallback to industry for them
  if (!mappedCurrentIndustry) {
    const currentIndustry = industry.replace(spaceRegex, '').toUpperCase()

    mappedCurrentIndustry = industryMapping[currentIndustry]
  }

  const industryAverages = getIsStockInUS(fundamentals)
    ? industryAverage.US
    : industryAverage.global

  const currentIndustry = industryAverages.find(datum => {
    return datum.industryName === mappedCurrentIndustry
  })

  return {
    ...currentIndustry,
    standardDeviationInStockPrices:
      currentIndustry.standardDeviationInStockPrices
  }
}

export default getCurrentIndustry
