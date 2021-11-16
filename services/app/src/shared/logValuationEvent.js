import { utils } from '@tracktak/common'
import dayjs from 'dayjs'

const logValuationEvent = (action, name) => {
  window.gtag('event', action, {
    event_category: 'Valuation',
    event_label: name,
    value: dayjs().format(utils.trackingFormatDate)
  })
}

export default logValuationEvent
