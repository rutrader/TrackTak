import { isNil } from "lodash-es";

const getPrice = (fundamentals, priceLastClose) => {
  return fundamentals.general.currencyCode === "GBX" ||
    fundamentals.general.currencyCode === "ILA"
    ? isNil(priceLastClose)
      ? null
      : priceLastClose / 100
    : priceLastClose;
};

export default getPrice;
