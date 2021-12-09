import cache from 'memory-cache'

const setCachedData = (data, cacheKey, time) => {
  if (data) {
    return cache.put(cacheKey, data, time)
  }
  return data
}

const getCachedData = cacheKey => {
  const cachedData = cache.get(cacheKey)

  if (cachedData) return cachedData

  return null
}

export const sendReqOrGetCachedData = async (
  request,
  keyPrefix,
  cacheParams = {},
  // 6 hour
  time = 2.16e7
) => {
  const cacheKey = `${keyPrefix}_${JSON.stringify(cacheParams)}`
  const cachedData = getCachedData(cacheKey)

  if (cachedData) return cachedData

  const data = await request()

  return setCachedData(data, cacheKey, time)
}
