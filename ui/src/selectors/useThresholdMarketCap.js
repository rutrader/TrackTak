import { useSelector } from "react-redux";

export const thresholdMarketCapUSD = 5000000000;

const useThresholdMarketCap = () => {
  const { mostRecentExchangeRate, data } = useSelector(
    (state) => state.fundamentals
  );

  if (!mostRecentExchangeRate || !data) {
    return thresholdMarketCapUSD;
  }

  const thresholdMarketCapConverted = mostRecentExchangeRate
    ? thresholdMarketCapUSD * mostRecentExchangeRate.close
    : thresholdMarketCapUSD;

  return thresholdMarketCapConverted;
};

export default useThresholdMarketCap;
