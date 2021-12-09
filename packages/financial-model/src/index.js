import advancedFormat from 'dayjs/plugin/advancedFormat'
import dayjs from 'dayjs'
import minMax from 'dayjs/plugin/minMax'
import isBetween from 'dayjs/plugin/isBetween'
import convertSubCurrencyToCurrency from './shared/convertSubCurrencyToCurrency'
import FinancialSpreadsheet from './spreadsheet/FinancialSpreadsheet'
import templates from './spreadsheet/templates.json'
import { fundamentalsFilter } from './spreadsheet/plugins/stockFinancials/getPlugin'

dayjs.extend(minMax)
dayjs.extend(advancedFormat)
dayjs.extend(isBetween)

export {
  fundamentalsFilter,
  convertSubCurrencyToCurrency,
  templates,
  FinancialSpreadsheet
}
