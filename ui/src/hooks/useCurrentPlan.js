import { useState, useEffect, useCallback, useRef } from "react";
import { getCurrentPlan, updateCurrentPlan } from "../api/api";
import { useAuth } from "./useAuth";

export const Plans = {
  ACTIVE: "Active",
  FROZEN: "Frozen",
};

const Addons = {
  US_SMALL_CAP: "us_small",
  US_LARGE_CAP: "us_large",
};

export const isStockDisabled = (currentPlan, stock) => {
  if (stock.exchange === "US" && stock.isUSLargeCap) {
    return true;
  }
  if (stock.exchange === "US" && !stock.isUSLargeCap) {
    return currentPlan.addons.includes(Addons.US_SMALL_CAP);
  }
  return currentPlan.addons.includes(stock.exchange); // TODO Might need a mapping to make this work
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
    fetchPlan,
    updatePlan,
  };
};

export default useCurrentPlan;
