import { utils } from '@tracktak/common'
import dayjs from 'dayjs'

const logSpreadsheetEvent = (action, name) => {
  window.gtag('event', action, {
    event_category: 'Spreadsheet',
    event_label: name,
    value: dayjs().format(utils.trackingFormatDate)
  })
}

export default logSpreadsheetEvent
