import cells from "../discountedCashFlow/cells";
import matureMarketEquityRiskPremium from "./matureMarketEquityRiskPremium";

const dcfInitialState = {
  cells,
  isYoyGrowthToggled: false,
  scope: {
    matureMarketEquityRiskPremium,
  },
};

export default dcfInitialState;
