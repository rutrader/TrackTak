import { mergeWith } from "lodash-es";

import smallCompaniesInterestSpreadsJson from "../data/smallCompaniesInterestSpreads.json";
import largeCompaniesInterestSpreadsJson from "../data/largeCompaniesInterestSpreads.json";

const companiesInterestSpreads = mergeWith(
  smallCompaniesInterestSpreadsJson,
  largeCompaniesInterestSpreadsJson,
  (objValue, srcValue) => {
    if (objValue.rating !== srcValue.rating)
      throw new Error("obj rating does not match src rating when it should");
    if (objValue.spread !== srcValue.spread)
      throw new Error("obj spread does not match src spread when it should");

    return {
      rating: objValue.rating,
      spread: parseFloat(objValue.spread) / 100,
      small: {
        from: objValue.from,
        to: objValue.to,
      },
      large: {
        from: srcValue.from,
        to: srcValue.to,
      },
    };
  },
).reverse();

export default companiesInterestSpreads;
