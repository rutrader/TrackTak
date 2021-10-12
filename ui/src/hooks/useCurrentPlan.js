import { useState, useEffect, useCallback } from "react";
import { getCurrentPlan } from "../api/api";
import { useAuth } from "./useAuth";

export const Plans = {
  ONE_HOUR_TRIAL: "1 Hour Free Trial",
  NON_ACTIVE: "Non-Active",
  ACTIVE: "Active",
  PRO: "Pro",
  FROZEN: "Frozen",
  DEACTIVATED: "Deactivated",
};

export const isStockDisabled = (currentPlan, stock) =>
  currentPlan.type === Plans.ONE_HOUR_TRIAL && !stock.isUSLargeCap;

const useCurrentPlan = () => {
  const { getAccessToken } = useAuth();
  const [currentPlan, setCurrentPlan] = useState();

  const fetchPlan = useCallback(async () => {
    const token = await getAccessToken();
    const response = await getCurrentPlan(token?.jwtToken);
    setCurrentPlan(response.data);
  }, [getAccessToken]);

  useEffect(() => {
    if (!currentPlan) {
      fetchPlan();
    }
  }, [currentPlan, fetchPlan]);

  return {
    currentPlan,
    fetchPlan,
  };
};

export default useCurrentPlan;
