import { useState, useEffect, useCallback, useRef } from 'react'
import { getCurrentPlan, updateCurrentPlan } from '../api/api'
import { useAuth } from '@tracktak/auth'

const useCurrentPlan = () => {
  const { getAccessToken } = useAuth()
  const cache = useRef()
  const [currentPlan, setCurrentPlan] = useState()

  const fetchPlan = useCallback(async () => {
    const token = await getAccessToken()
    const response = await getCurrentPlan(token?.jwtToken)
    cache.current = response.data
    setCurrentPlan(response.data)
  }, [getAccessToken])

  const updatePlan = useCallback(
    async planUpdates => {
      const token = await getAccessToken()
      const response = await updateCurrentPlan(token?.jwtToken, planUpdates)
      const newPlan = {
        ...currentPlan,
        ...response.data
      }
      cache.current = newPlan
      setCurrentPlan(newPlan)
    },
    [getAccessToken, currentPlan]
  )

  useEffect(() => {
    if (!currentPlan && !cache.current) {
      fetchPlan()
    } else {
      setCurrentPlan(cache.current)
    }
  }, [currentPlan, fetchPlan])

  return {
    currentPlan,
    updatePlan
  }
}

export default useCurrentPlan
