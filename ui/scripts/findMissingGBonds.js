require("dotenv/config");

const {
  getListOfExchanges,
  getExchangeSymbolList,
} = require("../../node/src/api");

const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const noUnknown = (value) => {
  return value !== "Unknown";
};

const findMissingGBonds = async () => {
  try {
    const exchanges = await getListOfExchanges();
    const gbonds = await getExchangeSymbolList("GBOND");

    const filteredExchangeCountries = exchanges
      .map((x) => x.Country)
      .filter(noUnknown)
      .filter(onlyUnique)
      .sort();

    const filteredGBondCountries = gbonds
      .map((x) => x.Country)
      .filter(noUnknown)
      .filter(onlyUnique)
      .sort();

    console.log(filteredExchangeCountries);

    console.log(filteredGBondCountries);

    const countriesWithoutGBonds = filteredExchangeCountries.filter(
      (country) => filteredGBondCountries.indexOf(country) === -1,
    );

    console.log("Countries without gbond: ");
    console.log(countriesWithoutGBonds);
    console.log(countriesWithoutGBonds.length);
  } catch (error) {
    console.error(error);
  }

  process.exit();
};

findMissingGBonds();
