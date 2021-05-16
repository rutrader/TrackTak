import iso3311a2 from "iso-3166-1-alpha-2";

const getCountryFromCountryISO = (countryISO) => {
  // Incorrect iso from API for UK
  // TODO: Move to the backend
  const newCountryISO = countryISO === "UK" ? "GB" : countryISO;

  return iso3311a2.getCountry(newCountryISO);
};

export default getCountryFromCountryISO;
