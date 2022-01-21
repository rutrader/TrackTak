import 'dotenv/config'
import fs from 'fs'
import industryMapping from './data/industryMapping.json'
import gicSubIndustryMapping from './data/gicSubIndustryMapping.json'

const __dirname = new URL('.', import.meta.url).pathname

const writeIndustryAverages = () => {
  const inputIndustryAveragesUSPath = `${__dirname}data/industryAveragesUS.json`
  const inputIndustryAveragesGlobalPath = `${__dirname}data/industryAveragesGlobal.json`

  let industryAveragesUS = JSON.parse(
    fs.readFileSync(inputIndustryAveragesUSPath)
  )
  let industryAveragesGlobal = JSON.parse(
    fs.readFileSync(inputIndustryAveragesGlobalPath)
  )

  Object.entries(gicSubIndustryMapping).forEach(([key, value]) => {
    try {
      const industryAverageUS = industryAveragesUS.find(
        x => x.industryName === value
      )
      const industryAverageGlobal = industryAveragesGlobal.find(
        x => x.industryName === value
      )

      industryAverageUS.gicSubIndustry = Array.isArray(
        industryAverageUS.gicSubIndustry
      )
        ? [...industryAverageUS.gicSubIndustry, key]
        : [key]

      industryAverageGlobal.gicSubIndustry = Array.isArray(
        industryAverageGlobal.gicSubIndustry
      )
        ? [...industryAverageGlobal.gicSubIndustry, key]
        : [key]
    } catch (error) {
      console.log(`failed for key: ${key}`)
      throw error
    }
  })

  Object.entries(industryMapping).forEach(([key, value]) => {
    try {
      const industryAverageUS = industryAveragesUS.find(
        x => x.industryName === value
      )
      const industryAverageGlobal = industryAveragesGlobal.find(
        x => x.industryName === value
      )

      industryAverageUS.industry = Array.isArray(industryAverageUS.industry)
        ? [...industryAverageUS.industry, key]
        : [key]
      industryAverageGlobal.industry = Array.isArray(
        industryAverageGlobal.industry
      )
        ? [...industryAverageGlobal.industry, key]
        : [key]
    } catch (error) {
      console.log(`failed for key: ${key}`)
      throw error
    }
  })

  Object.values(industryAveragesUS).forEach(industryAverageUS => {
    industryAverageUS.industry = industryAverageUS.industry ?? [
      industryAverageUS.industryName
    ]

    delete industryAverageUS.industryName
  })

  Object.values(industryAveragesGlobal).forEach(industryAverageGlobal => {
    industryAverageGlobal.industry = industryAverageGlobal.industry ?? [
      industryAverageGlobal.industryName
    ]

    delete industryAverageGlobal.industryName
  })

  const sort = (a, b) => {
    if (a.industry.some(i => i.includes('Total Market'))) {
      return 1
    }

    if (b.industry.some(i => i.includes('Total Market'))) {
      return -1
    }

    let localeCompareValue = Infinity

    a.industry.forEach(aIndustry => {
      b.industry.forEach(bIndustry => {
        localeCompareValue = Math.min(
          localeCompareValue,
          aIndustry.localeCompare(bIndustry)
        )
      })
    })

    return localeCompareValue
  }

  industryAveragesUS.sort(sort)
  industryAveragesGlobal.sort(sort)

  industryAveragesUS = industryAveragesUS.map(
    ({ industry, gicSubIndustry, ...rest }) => {
      return {
        industry,
        gicSubIndustry,
        ...rest
      }
    }
  )

  industryAveragesGlobal = industryAveragesGlobal.map(
    ({ industry, gicSubIndustry, ...rest }) => {
      return {
        industry,
        gicSubIndustry,
        ...rest
      }
    }
  )

  const outputIndustryAveragesUSPath = `${__dirname}../services/node/src/api/v1/securities/stocks/industryAverages/US.json`
  const outputIndustryAveragesGlobalPath = `${__dirname}../services/node/src/api/v1/securities/stocks/industryAverages/global.json`

  fs.writeFileSync(
    outputIndustryAveragesUSPath,
    JSON.stringify(industryAveragesUS)
  )

  fs.writeFileSync(
    outputIndustryAveragesGlobalPath,
    JSON.stringify(industryAveragesGlobal)
  )

  process.exit(0)
}

writeIndustryAverages()
