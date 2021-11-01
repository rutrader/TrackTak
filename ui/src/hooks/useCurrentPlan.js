import { useState, useEffect, useCallback, useRef } from "react";
import { getCurrentPlan, updateCurrentPlan } from "../api/api";
import {
  exchangeToPriceId,
  smallCapUSPriceId,
  worldwidePriceId,
} from "../data/regions";
import { useAuth } from "./useAuth";

export const Plans = {
  ACTIVE: "Active",
  FROZEN: "Frozen",
};

export const isStockDisabled = (currentPlan, stock) => {
  if (
    currentPlan?.priceIds.includes(worldwidePriceId) ||
    (stock.exchange === "US" && stock.isUSLargeCap)
  ) {
    return false;
  }
  if (stock.exchange === "US" && !stock.isUSLargeCap) {
    return !currentPlan?.priceIds.includes(smallCapUSPriceId);
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
