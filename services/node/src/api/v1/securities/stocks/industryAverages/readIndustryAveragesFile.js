import fs from 'fs/promises'

const readIndustryAveragesFile = async isUSStock => {
  const fileName = isUSStock ? 'industryAveragesUS' : 'industryAveragesGlobal'

  const industryAverages = await fs.readFile(
    new URL(`./${fileName}.json`, import.meta.url),
    'utf8'
  )

  return JSON.parse(industryAverages)
}

export default readIndustryAveragesFile
