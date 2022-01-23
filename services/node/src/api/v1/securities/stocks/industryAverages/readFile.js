import fs from 'fs/promises'

const readFile = async isUSStock => {
  const fileName = isUSStock ? 'US' : 'global'

  const industryAverages = await fs.readFile(
    new URL(`./${fileName}.json`, import.meta.url),
    'utf8'
  )

  return JSON.parse(industryAverages)
}

export default readFile
