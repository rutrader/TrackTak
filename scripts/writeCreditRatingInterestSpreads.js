import 'dotenv/config'
import fs from 'fs'
import { mergeWith } from 'lodash-es'

const __dirname = new URL('.', import.meta.url).pathname

const writeCreditRatingInterestSpreads = () => {
  const smallCompaniesInterestSpreadsPath = `${__dirname}data/smallCompaniesInterestSpreads.json`
  const largeCompaniesInterestSpreadsPath = `${__dirname}data/largeCompaniesInterestSpreads.json`

  const smallCompaniesInterestSpreads = JSON.parse(
    fs.readFileSync(smallCompaniesInterestSpreadsPath)
  )
  const largeCompaniesInterestSpreads = JSON.parse(
    fs.readFileSync(largeCompaniesInterestSpreadsPath)
  )

  const companiesInterestSpreads = mergeWith(
    smallCompaniesInterestSpreads,
    largeCompaniesInterestSpreads,
    (objValue, srcValue) => {
      if (objValue.rating !== srcValue.rating)
        throw new Error('obj rating does not match src rating when it should')
      if (objValue.spread !== srcValue.spread)
        throw new Error('obj spread does not match src spread when it should')

      return {
        rating: objValue.rating,
        spread: objValue.spread,
        smallFrom: objValue.from,
        smallTo: objValue.to,
        largeFrom: srcValue.from,
        largeTo: srcValue.to
      }
    }
  ).reverse()

  const outputPath = `${__dirname}../services/node/src/api/v1/market/creditRatingInterestSpreads/index.json`

  fs.writeFileSync(outputPath, JSON.stringify(companiesInterestSpreads))

  process.exit(0)
}

writeCreditRatingInterestSpreads()
