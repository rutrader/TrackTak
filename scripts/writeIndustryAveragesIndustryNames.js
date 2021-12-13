import 'dotenv/config'
import fs from 'fs'
import industryMapping from './data/industryMapping.json'
import gicSubIndustryMapping from './data/gicSubIndustryMapping.json'

const __dirname = new URL('.', import.meta.url).pathname

const setIndustryNames = () => {
  const industryAveragesUSPath = `${__dirname}../services/node/src/api/v1/securities/stocks/industryAverages/industryAveragesUS.json`
  const industryAveragesGlobalPath = `${__dirname}../services/node/src/api/v1/securities/stocks/industryAverages/industryAveragesGlobal.json`

  const industryAveragesUS = JSON.parse(fs.readFileSync(industryAveragesUSPath))
  const industryAveragesGlobal = JSON.parse(
    fs.readFileSync(industryAveragesGlobalPath)
  )

  Object.entries(gicSubIndustryMapping).forEach(([key, value]) => {
    try {
      const industryAverageUS = industryAveragesUS.find(
        x => x.industryName === value
      )
      const industryAverageGlobal = industryAveragesGlobal.find(
        x => x.industryName === value
      )

      industryAverageUS.gicSubIndustry = key
      industryAverageGlobal.gicSubIndustry = key
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

      industryAverageUS.newIndustryName = key
      industryAverageGlobal.newIndustryName = key
    } catch (error) {
      console.log(`failed for key: ${key}`)
      throw error
    }
  })

  Object.values(industryAveragesUS).forEach(industryAverageUS => {
    industryAverageUS.industryName =
      industryAverageUS.newIndustryName ?? industryAverageUS.industryName

    delete industryAverageUS.newIndustryName
  })

  Object.values(industryAveragesGlobal).forEach(industryAverageGlobal => {
    industryAverageGlobal.industryName =
      industryAverageGlobal.newIndustryName ??
      industryAverageGlobal.industryName

    delete industryAverageGlobal.newIndustryName
  })

  const sort = (a, b) => {
    if (a.industryName.includes('Total Market')) {
      return 1
    }

    if (b.industryName.includes('Total Market')) {
      return -1
    }

    return a.industryName?.localeCompare(b.industryName)
  }

  industryAveragesUS.sort(sort)
  industryAveragesGlobal.sort(sort)

  fs.writeFileSync(industryAveragesUSPath, JSON.stringify(industryAveragesUS))

  fs.writeFileSync(
    industryAveragesGlobalPath,
    JSON.stringify(industryAveragesGlobal)
  )

  process.exit(0)
}

setIndustryNames()
