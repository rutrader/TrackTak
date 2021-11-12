import { useEffect, useState } from 'react'
import { getPrice } from '../api/api'
import { useAuth } from '../hooks/useAuth'

const useFetchPrice = priceId => {
  const { getAccessToken } = useAuth()
  const [price, setPrice] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken()
      const {
        data: { price }
      } = await getPrice(priceId, token?.jwtToken)

      setPrice(price)
    }

    fetchData()
  }, [getAccessToken, priceId])

  return price
}

export default useFetchPrice
