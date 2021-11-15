import advancedFormat from 'dayjs/plugin/advancedFormat'
import dayjs from 'dayjs'
import minMax from 'dayjs/plugin/minMax'
import isBetween from 'dayjs/plugin/isBetween'
import convertSubCurrencyToCurrency from './shared/convertSubCurrencyToCurrency'
import convertStockAPIData from './shared/convertStockAPIData'
import * as thunks from './redux/thunks/stockThunks'
import FinancialSpreadsheet from './spreadsheet/FinancialSpreadsheet'
import { getFreeCashFlowFirmSimple } from './spreadsheet/templates'

dayjs.extend(minMax)
dayjs.extend(advancedFormat)
dayjs.extend(isBetween)

export {
  convertSubCurrencyToCurrency,
  convertStockAPIData,
  thunks,
  getFreeCashFlowFirmSimple,
  FinancialSpreadsheet
}
