import dayjs from 'dayjs'

// This is needed because EOD doesn't return data on some days.
// Stock prices: Sat, Sun & holidays, today
// Bonds: Sat, (some Sundays), today
// FX: Sat, (some Sundays), today
// TODO: Add same for holidays
const alterFromToQuery = query => {
  const newQuery = query
  const { period, from, to } = newQuery

  if (!from && !to) return newQuery

  if ((period === 'd' || !period) && from === to) {
    let date = dayjs(from)

    const todayDate = dayjs()

    if (todayDate.isSame(date, 'day')) {
      date = date.subtract(1, 'day')
    }

    // Sunday
    if (date.day() === 0) {
      date = date.subtract(2, 'day')
    }

    // Saturday
    if (date.day() === 6) {
      date = date.subtract(1, 'day')
    }

    newQuery.from = date.format('YYYY-MM-DD')
    newQuery.to = date.format('YYYY-MM-DD')
  }

  return newQuery
}

export default alterFromToQuery
