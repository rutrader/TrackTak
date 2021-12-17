import fs from 'fs/promises'

const readFile = async () => {
  const creditRatingInterestSpreads = await fs.readFile(
    new URL('./index.json', import.meta.url),
    'utf8'
  )

  return JSON.parse(creditRatingInterestSpreads)
}

export default readFile
