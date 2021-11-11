import advancedFormat from 'dayjs/plugin/advancedFormat'
import dayjs from 'dayjs'
import minMax from 'dayjs/plugin/minMax'
import isBetween from 'dayjs/plugin/isBetween'
import convertSubCurrencyToCurrency from './shared/convertSubCurrencyToCurrency'
import convertStockAPIData from './shared/convertStockAPIData'
import * as thunks from './redux/thunks/stockThunks'
import FinancialSpreadsheet from './spreadsheet/FinancialSpreadsheet'
import createStore from './redux/createStore'
import freeCashFlowFirmSimple from './spreadsheet/templates/freeCashFlowFirmSimple.json'

dayjs.extend(minMax)
dayjs.extend(advancedFormat)
dayjs.extend(isBetween)

export default {
  convertSubCurrencyToCurrency,
  convertStockAPIData,
  thunks,
  createStore,
  freeCashFlowFirmSimple,
  FinancialSpreadsheet
}
