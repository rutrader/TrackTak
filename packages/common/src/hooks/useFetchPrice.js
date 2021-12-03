import { useEffect, useState } from 'react'
import { getPlanPrice } from '../api/api'
import { useAuth } from './useAuth'

const useFetchPrice = priceId => {
  const { getAccessToken } = useAuth()
  const [price, setPrice] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken()
      const {
        data: { price }
      } = await getPlanPrice(priceId, token?.jwtToken)

      setPrice(price)
    }

    fetchData()
  }, [getAccessToken, priceId])

  return price
}

export default useFetchPrice
