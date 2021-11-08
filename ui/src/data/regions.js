import usaIconSvg from "../assets/united-states.svg";
import chinaIconSvg from "../assets/china.svg";
import europeIconSvg from "../assets/europe.svg";
import ukIconSvg from "../assets/united-kingdom.svg";
import brazilIconSvg from "../assets/brazil.svg";

export const mediumCapUSPlusPriceId = "price_1JpAUvDOsUBI2OhCsE4GSzNk";

export const listAPIregions = [
  {
    priceId: mediumCapUSPlusPriceId,
    regionName: "United States (medium cap+)",
    iconSvg: usaIconSvg,
    disabled: true,
  },
  {
    priceId: "price_1JoW4KDOsUBI2OhCHFgCSAVi",
    regionName: "United States (small cap)",
    iconSvg: usaIconSvg,
  },
  {
    priceId: "price_1JhdQPDOsUBI2OhCOkxiOM9Q",
    regionName: "China & Asia",
    iconSvg: chinaIconSvg,
  },
  {
    priceId: "price_1Ji1WGDOsUBI2OhC1wdJ7FcD",
    regionName: "Latin America, Middle East & Africa",
    iconSvg: brazilIconSvg,
  },
  {
    priceId: "price_1JhdQpDOsUBI2OhCztCOuKki",
    regionName: "Europe",
    iconSvg: europeIconSvg,
  },
  {
    priceId: "price_1JhdRHDOsUBI2OhCVVGyzsZF",
    regionName: "Canada, Australia, UK & Ireland",
    iconSvg: ukIconSvg,
  },
];
