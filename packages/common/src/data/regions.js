import usaIconSvg from '../assets/united-states.svg'
import chinaIconSvg from '../assets/china.svg'
import europeIconSvg from '../assets/europe.svg'
import ukIconSvg from '../assets/united-kingdom.svg'
import brazilIconSvg from '../assets/brazil.svg'

export const PriceIds = {
  WORLDWIDE: 'price_1Jo6txDOsUBI2OhCuv0mVZE0',
  MEDIUM_CAP_US_PLUS: 'price_1JpAUvDOsUBI2OhCsE4GSzNk',
  SMALL_CAP_US: 'price_1JoW4KDOsUBI2OhCHFgCSAVi',
  CHINA_AND_ASIA: 'price_1JhdQPDOsUBI2OhCOkxiOM9Q',
  LATIN_AMERICA_AND_EMEA: 'price_1Ji1WGDOsUBI2OhC1wdJ7FcD',
  EUROPE: 'price_1JhdQpDOsUBI2OhCztCOuKki',
  CANADA_AUSTRALIA_UK_IRELAND: 'price_1JhdRHDOsUBI2OhCVVGyzsZF'
}

export const listAPIregions = [
  {
    priceId: PriceIds.MEDIUM_CAP_US_PLUS,
    regionName: 'United States (medium cap+)',
    iconSvg: usaIconSvg,
    disabled: true
  },
  {
    priceId: PriceIds.SMALL_CAP_US,
    regionName: 'United States (small cap)',
    iconSvg: usaIconSvg
  },
  {
    priceId: PriceIds.CHINA_AND_ASIA,
    regionName: 'China & Asia',
    iconSvg: chinaIconSvg
  },
  {
    priceId: PriceIds.LATIN_AMERICA_AND_EMEA,
    regionName: 'Latin America, Middle East & Africa',
    iconSvg: brazilIconSvg
  },
  {
    priceId: PriceIds.EUROPE,
    regionName: 'Europe',
    iconSvg: europeIconSvg
  },
  {
    priceId: PriceIds.CANADA_AUSTRALIA_UK_IRELAND,
    regionName: 'Canada, Australia, UK & Ireland',
    iconSvg: ukIconSvg
  }
]

export const exchangeToPriceId = {
  LSE: PriceIds.CANADA_AUSTRALIA_UK_IRELAND,
  NEO: PriceIds.CANADA_AUSTRALIA_UK_IRELAND,
  V: PriceIds.CANADA_AUSTRALIA_UK_IRELAND,
  TO: PriceIds.CANADA_AUSTRALIA_UK_IRELAND,
  AU: PriceIds.CANADA_AUSTRALIA_UK_IRELAND,
  CN: PriceIds.CANADA_AUSTRALIA_UK_IRELAND,
  BE: PriceIds.EUROPE,
  F: PriceIds.EUROPE,
  STU: PriceIds.EUROPE,
  HA: PriceIds.EUROPE,
  MU: PriceIds.EUROPE,
  HM: PriceIds.EUROPE,
  XETRA: PriceIds.EUROPE,
  DU: PriceIds.EUROPE,
  VI: PriceIds.EUROPE,
  LU: PriceIds.EUROPE,
  MI: PriceIds.EUROPE,
  PA: PriceIds.EUROPE,
  BR: PriceIds.EUROPE,
  MC: PriceIds.EUROPE,
  LS: PriceIds.EUROPE,
  AS: PriceIds.EUROPE,
  SW: PriceIds.EUROPE,
  VX: PriceIds.EUROPE,
  HE: PriceIds.EUROPE,
  RG: PriceIds.EUROPE,
  IC: PriceIds.EUROPE,
  ST: PriceIds.EUROPE,
  OL: PriceIds.EUROPE,
  VS: PriceIds.EUROPE,
  CO: PriceIds.EUROPE,
  NFN: PriceIds.EUROPE,
  IR: PriceIds.EUROPE,
  NB: PriceIds.EUROPE,
  TL: PriceIds.EUROPE,
  BUD: PriceIds.EUROPE,
  WAR: PriceIds.EUROPE,
  PSE: PriceIds.EUROPE,
  SG: PriceIds.EUROPE,
  BSE: PriceIds.EUROPE,
  KAR: PriceIds.EUROPE,
  AT: PriceIds.EUROPE,
  RO: PriceIds.EUROPE,
  ZSE: PriceIds.EUROPE,
  IL: PriceIds.EUROPE,
  MCX: PriceIds.EUROPE,
  IS: PriceIds.EUROPE,
  ETLX: PriceIds.EUROPE,
  HK: PriceIds.CHINA_AND_ASIA,
  KO: PriceIds.CHINA_AND_ASIA,
  KQ: PriceIds.CHINA_AND_ASIA,
  SHE: PriceIds.CHINA_AND_ASIA,
  BK: PriceIds.CHINA_AND_ASIA,
  NSE: PriceIds.CHINA_AND_ASIA,
  SHG: PriceIds.CHINA_AND_ASIA,
  JK: PriceIds.CHINA_AND_ASIA,
  VN: PriceIds.CHINA_AND_ASIA,
  KLSE: PriceIds.CHINA_AND_ASIA,
  TWO: PriceIds.CHINA_AND_ASIA,
  TW: PriceIds.CHINA_AND_ASIA,
  TA: PriceIds.LATIN_AMERICA_AND_EMEA,
  JSE: PriceIds.LATIN_AMERICA_AND_EMEA,
  SN: PriceIds.LATIN_AMERICA_AND_EMEA,
  SR: PriceIds.LATIN_AMERICA_AND_EMEA,
  SA: PriceIds.LATIN_AMERICA_AND_EMEA,
  BA: PriceIds.LATIN_AMERICA_AND_EMEA,
  MX: PriceIds.LATIN_AMERICA_AND_EMEA,
  LIM: PriceIds.LATIN_AMERICA_AND_EMEA
}
