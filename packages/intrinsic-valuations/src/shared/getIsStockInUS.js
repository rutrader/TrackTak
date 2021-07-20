const getIsStockInUS = (fundamentals) =>
  fundamentals.general.countryISO === "US";

export default getIsStockInUS;
