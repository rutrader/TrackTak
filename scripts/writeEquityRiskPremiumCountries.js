import 'dotenv/config'
import fs from 'fs'
import iso3311a2 from 'iso-3166-1-alpha-2'

const __dirname = new URL('.', import.meta.url).pathname

const writeEquityRiskPremiumCountries = () => {
  const inputPath = `${__dirname}data/equityRiskPremiumCountries.json`

  const equityRiskPremiumCountries = JSON.parse(fs.readFileSync(inputPath))

  equityRiskPremiumCountries.forEach(erpCountry => {
    let country = erpCountry.country

    if (country === 'Bolivia') {
      country = 'Bolivia, Plurinational State of'
    }

    let countryISO = iso3311a2.getCode(country)

    // Incorrect iso from API for UK on EODHistoricalData so we
    // use same one
    if (countryISO === 'GB') {
      countryISO = 'UK'
    }

    erpCountry.countryISO = countryISO

    delete erpCountry.adjDefaultSpread
  })

  const sort = (a, b) => {
    return a.country.localeCompare(b.country)
  }

  equityRiskPremiumCountries.sort(sort)

  const outputPath = `${__dirname}../services/node/src/api/v1/equityRiskPremiums/countries.json`

  fs.writeFileSync(outputPath, JSON.stringify(equityRiskPremiumCountries))

  process.exit(0)
}

writeEquityRiskPremiumCountries()
