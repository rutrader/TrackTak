import { useState, useEffect, useCallback } from "react";
import { getCurrentPlan } from "../api/api";
import { useAuth } from "./useAuth";

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
