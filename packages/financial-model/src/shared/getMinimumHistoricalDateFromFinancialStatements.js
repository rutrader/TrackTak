import dayjs from 'dayjs'

const monthDateFormat = 'YYYY-MM'

const getMinimumHistoricalDateFromFinancialStatements = (
  incomeStatement,
  balanceSheet
) => {
  const mergedStatements = {
    ...incomeStatement.yearly,
    ...balanceSheet.yearly
  }

  let minDate

  const yearlyDatesAsMonths = []

  Object.keys(mergedStatements).forEach(key => {
    yearlyDatesAsMonths.push(dayjs(key).format(monthDateFormat))
  })

  Object.keys(mergedStatements).forEach((date, i) => {
    const formattedDate = `${dayjs(date).format(monthDateFormat)}-01`
    const newDate = dayjs(formattedDate)

    if (i === 0) {
      minDate = newDate
    }

    minDate = dayjs.min(minDate, newDate)
  })

  return minDate
}

export default getMinimumHistoricalDateFromFinancialStatements
