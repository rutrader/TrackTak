import dayjs from 'dayjs'

// This is needed because EOD doesn't return data on
// holidays, Sat, Sun for prices & holidays, Sat for FX, Bonds
// TODO: Add same for holidays
const alterFromToQuery = (query, changeSunday = false) => {
  const newQuery = query
  const { period, from, to } = newQuery

  if ((period === 'd' || !period) && from === to) {
    let date = dayjs(from)

    if (changeSunday) {
      // Sunday
      if (date.day() === 0) {
        date = date.day(6)
      }
    }

    // Saturday
    if (date.day() === 6) {
      date = date.day(5)
    }

    newQuery.from = date.format('YYYY-MM-DD')
    newQuery.to = date.format('YYYY-MM-DD')
  }

  return newQuery
}

export default alterFromToQuery
