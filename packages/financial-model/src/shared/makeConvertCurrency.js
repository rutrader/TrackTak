import dayjs from 'dayjs'

const makeConvertCurrency =
  exchangeRates => (datePeriodsToConvertAt, valueToConvert) => {
    if (!isFinite(valueToConvert) || !exchangeRates?.length)
      return valueToConvert

    // TODO: Make this exact day later
    const sumOfExchangeRateCloses = datePeriodsToConvertAt.reduce(
      (prev, date) => {
        // Get exchange rate for that month
        const datePeriodAsMonthDate = dayjs(date).format('YYYY-MM')
        const close = exchangeRates[datePeriodAsMonthDate]?.close ?? 0

        return prev + close
      },
      0
    )

    const averageOfExchangeRateCloses =
      sumOfExchangeRateCloses / datePeriodsToConvertAt.length

    return valueToConvert * averageOfExchangeRateCloses
  }

export default makeConvertCurrency
