import { useState, useEffect, useCallback, useRef } from "react";
import { getCurrentPlan, updateCurrentPlan } from "../api/api";
import { exchangeToPriceId, PriceIds } from "../data/regions";
import { useAuth } from "./useAuth";

export const isStockDisabled = (currentPlan, stock) => {
  if (
    currentPlan?.priceIds.includes(PriceIds.WORLDWIDE) ||
    (stock.exchange === "US" && stock.isMediumCapUSPlus)
  ) {
    return false;
  }
  if (stock.exchange === "US" && !stock.isMediumCapUSPlus) {
    return !currentPlan?.priceIds.includes(PriceIds.SMALL_CAP_US);
  }
  return !currentPlan?.priceIds.includes(exchangeToPriceId[stock.exchange]);
};

const useCurrentPlan = () => {
  const { getAccessToken } = useAuth();
  const cache = useRef();
  const [currentPlan, setCurrentPlan] = useState();

  const fetchPlan = useCallback(async () => {
    const token = await getAccessToken();
    const response = await getCurrentPlan(token?.jwtToken);
    cache.current = response.data;
    setCurrentPlan(response.data);
  }, [getAccessToken]);

  const updatePlan = useCallback(
    async (planUpdates) => {
      const token = await getAccessToken();
      const response = await updateCurrentPlan(token?.jwtToken, planUpdates);
      const newPlan = {
        ...currentPlan,
        ...response.data,
      };
      cache.current = newPlan;
      setCurrentPlan(newPlan);
    },
    [getAccessToken, currentPlan],
  );

  useEffect(() => {
    if (!currentPlan && !cache.current) {
      fetchPlan();
    } else {
      setCurrentPlan(cache.current);
    }
  }, [currentPlan, fetchPlan]);

  return {
    currentPlan,
    updatePlan,
  };
};

export default useCurrentPlan;
