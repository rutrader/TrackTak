import React from "react";
import USAIconSvg from "../icons/united-states.svg";
import ChinaIconSvg from "../icons/china.svg";
import EuropeIconSvg from "../icons/europe.svg";
import UKIconSvg from "../icons/united-kingdom.svg";
import BrazilIconSvg from "../icons/brazil.svg";

const commonIconProps = {
  width: 30,
  height: 30,
};

export const worldwidePriceId = "price_1Jo6txDOsUBI2OhCuv0mVZE0";
export const mediumCapUSPlusPriceId = "price_1JpAUvDOsUBI2OhCsE4GSzNk";
export const smallCapUSPriceId = "price_1JoW4KDOsUBI2OhCHFgCSAVi";

export const listAPIregions = [
  {
    priceId: mediumCapUSPlusPriceId,
    regionName: "United States (medium cap+)",
    iconSvg: <USAIconSvg {...commonIconProps} alt="usa" />,
    disabled: true,
  },
  {
    priceId: smallCapUSPriceId,
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

export const exchangeToPriceId = {
  // Canada, Australia, UK & Ireland
  LSE: "price_1JhdRHDOsUBI2OhCVVGyzsZF",
  NEO: "price_1JhdRHDOsUBI2OhCVVGyzsZF",
  V: "price_1JhdRHDOsUBI2OhCVVGyzsZF",
  TO: "price_1JhdRHDOsUBI2OhCVVGyzsZF",
  AU: "price_1JhdRHDOsUBI2OhCVVGyzsZF",
  CN: "price_1JhdRHDOsUBI2OhCVVGyzsZF",

  // Europe
  BE: "price_1JhdQpDOsUBI2OhCztCOuKki",
  F: "price_1JhdQpDOsUBI2OhCztCOuKki",
  STU: "price_1JhdQpDOsUBI2OhCztCOuKki",
  HA: "price_1JhdQpDOsUBI2OhCztCOuKki",
  MU: "price_1JhdQpDOsUBI2OhCztCOuKki",
  HM: "price_1JhdQpDOsUBI2OhCztCOuKki",
  XETRA: "price_1JhdQpDOsUBI2OhCztCOuKki",
  DU: "price_1JhdQpDOsUBI2OhCztCOuKki",
  VI: "price_1JhdQpDOsUBI2OhCztCOuKki",
  LU: "price_1JhdQpDOsUBI2OhCztCOuKki",
  MI: "price_1JhdQpDOsUBI2OhCztCOuKki",
  PA: "price_1JhdQpDOsUBI2OhCztCOuKki",
  BR: "price_1JhdQpDOsUBI2OhCztCOuKki",
  MC: "price_1JhdQpDOsUBI2OhCztCOuKki",
  LS: "price_1JhdQpDOsUBI2OhCztCOuKki",
  AS: "price_1JhdQpDOsUBI2OhCztCOuKki",
  SW: "price_1JhdQpDOsUBI2OhCztCOuKki",
  VX: "price_1JhdQpDOsUBI2OhCztCOuKki",
  HE: "price_1JhdQpDOsUBI2OhCztCOuKki",
  RG: "price_1JhdQpDOsUBI2OhCztCOuKki",
  IC: "price_1JhdQpDOsUBI2OhCztCOuKki",
  ST: "price_1JhdQpDOsUBI2OhCztCOuKki",
  OL: "price_1JhdQpDOsUBI2OhCztCOuKki",
  VS: "price_1JhdQpDOsUBI2OhCztCOuKki",
  CO: "price_1JhdQpDOsUBI2OhCztCOuKki",
  NFN: "price_1JhdQpDOsUBI2OhCztCOuKki",
  IR: "price_1JhdQpDOsUBI2OhCztCOuKki",
  NB: "price_1JhdQpDOsUBI2OhCztCOuKki",
  TL: "price_1JhdQpDOsUBI2OhCztCOuKki",
  BUD: "price_1JhdQpDOsUBI2OhCztCOuKki",
  WAR: "price_1JhdQpDOsUBI2OhCztCOuKki",
  PSE: "price_1JhdQpDOsUBI2OhCztCOuKki",
  SG: "price_1JhdQpDOsUBI2OhCztCOuKki",
  BSE: "price_1JhdQpDOsUBI2OhCztCOuKki",
  KAR: "price_1JhdQpDOsUBI2OhCztCOuKki",
  AT: "price_1JhdQpDOsUBI2OhCztCOuKki",
  RO: "price_1JhdQpDOsUBI2OhCztCOuKki",
  ZSE: "price_1JhdQpDOsUBI2OhCztCOuKki",
  IL: "price_1JhdQpDOsUBI2OhCztCOuKki",
  MCX: "price_1JhdQpDOsUBI2OhCztCOuKki",
  IS: "price_1JhdQpDOsUBI2OhCztCOuKki",
  ETLX: "price_1JhdQpDOsUBI2OhCztCOuKki",

  // Asia
  HK: "price_1JhdQPDOsUBI2OhCOkxiOM9Q",
  KO: "price_1JhdQPDOsUBI2OhCOkxiOM9Q",
  KQ: "price_1JhdQPDOsUBI2OhCOkxiOM9Q",
  SHE: "price_1JhdQPDOsUBI2OhCOkxiOM9Q",
  BK: "price_1JhdQPDOsUBI2OhCOkxiOM9Q",
  NSE: "price_1JhdQPDOsUBI2OhCOkxiOM9Q",
  SHG: "price_1JhdQPDOsUBI2OhCOkxiOM9Q",
  JK: "price_1JhdQPDOsUBI2OhCOkxiOM9Q",
  VN: "price_1JhdQPDOsUBI2OhCOkxiOM9Q",
  KLSE: "price_1JhdQPDOsUBI2OhCOkxiOM9Q",
  TWO: "price_1JhdQPDOsUBI2OhCOkxiOM9Q",
  TW: "price_1JhdQPDOsUBI2OhCOkxiOM9Q",

  // Latin America, Middle East & Africa
  TA: "price_1Ji1WGDOsUBI2OhC1wdJ7FcD",
  JSE: "price_1Ji1WGDOsUBI2OhC1wdJ7FcD",
  SN: "price_1Ji1WGDOsUBI2OhC1wdJ7FcD",
  SR: "price_1Ji1WGDOsUBI2OhC1wdJ7FcD",
  SA: "price_1Ji1WGDOsUBI2OhC1wdJ7FcD",
  BA: "price_1Ji1WGDOsUBI2OhC1wdJ7FcD",
  MX: "price_1Ji1WGDOsUBI2OhC1wdJ7FcD",
  LIM: "price_1Ji1WGDOsUBI2OhC1wdJ7FcD",
};
