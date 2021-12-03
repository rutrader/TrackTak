const eodBaseUrl = 'https://eodhistoricaldata.com/api'

export const fundamentalsEndpoint = `${eodBaseUrl}/fundamentals`
export const eodEndpoint = `${eodBaseUrl}/eod`
export const eodSearchEndpoint = `${eodBaseUrl}/search`
export const eodAPIToken = process.env.EOD_HISTORICAL_DATA_API_KEY
export const MEDIUM_PLUS_CAP_PRICE_THRESHOLD = 30
