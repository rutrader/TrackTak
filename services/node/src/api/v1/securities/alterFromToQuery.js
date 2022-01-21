import dayjs from 'dayjs'

export const isEODQueryFromModified = ({ period, from, to }) => {
  if (!from && !to) return false

  return (period === 'd' || !period) && from === to
}

// This is needed because EOD doesn't return data on some days.
// So we return past 7 days and get latest if user requested a single
// day that doesn't exist
const alterFromToQuery = query => {
  const newQuery = { ...query }

  if (isEODQueryFromModified(newQuery)) {
    const { from } = newQuery

    let date = dayjs(from)

    date = date.subtract(7, 'day')

    newQuery.from = date.format('YYYY-MM-DD')

    return newQuery
  }

  return newQuery
}

export default alterFromToQuery
