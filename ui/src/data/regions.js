import React from "react";
import USAIconSvg from "../assets/united-states.svg";
import ChinaIconSvg from "../assets/china.svg";
import EuropeIconSvg from "../assets/europe.svg";
import UKIconSvg from "../assets/united-kingdom.svg";
import BrazilIconSvg from "../assets/brazil.svg";

const commonIconProps = {
  width: 30,
  height: 30,
};

export const mediumCapUSPlusPriceId = "price_1JpAUvDOsUBI2OhCsE4GSzNk";

export const listAPIregions = [
  {
    priceId: mediumCapUSPlusPriceId,
    regionName: "United States (medium cap+)",
    iconSvg: <USAIconSvg {...commonIconProps} alt="usa" />,
    disabled: true,
  },
  {
    priceId: "price_1JoW4KDOsUBI2OhCHFgCSAVi",
    regionName: "United States (small cap)",
    iconSvg: <USAIconSvg {...commonIconProps} alt="usa" />,
  },
  {
    priceId: "price_1JhdQPDOsUBI2OhCOkxiOM9Q",
    regionName: "China & Asia",
    iconSvg: <ChinaIconSvg {...commonIconProps} alt="china" />,
  },
  {
    priceId: "price_1Ji1WGDOsUBI2OhC1wdJ7FcD",
    regionName: "Latin America, Middle East & Africa",
    iconSvg: <BrazilIconSvg {...commonIconProps} alt="brazil" />,
  },
  {
    priceId: "price_1JhdQpDOsUBI2OhCztCOuKki",
    regionName: "Europe",
    iconSvg: <EuropeIconSvg {...commonIconProps} alt="europe" />,
  },
  {
    priceId: "price_1JhdRHDOsUBI2OhCVVGyzsZF",
    regionName: "Canada, Australia, UK & Ireland",
    iconSvg: <UKIconSvg {...commonIconProps} alt="uk" />,
  },
];
