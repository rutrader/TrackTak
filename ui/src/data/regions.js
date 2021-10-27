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

export const listAPIregions = [
  {
    id: "us_large",
    regionName: "United States (large cap)",
    price: "$9.99",
    iconSvg: <USAIconSvg {...commonIconProps} alt="usa" />,
  },
  {
    id: "us_small",
    regionName: "United States (small cap)",
    price: "$0.00",
    iconSvg: <USAIconSvg {...commonIconProps} alt="usa" />,
  },
  {
    id: "apac",
    regionName: "China & Asia",
    price: "$14.99",
    iconSvg: <ChinaIconSvg {...commonIconProps} alt="china" />,
  },
  {
    id: "lamea",
    regionName: "Latin America, Middle East & Africa",
    price: "$12.99",
    iconSvg: <BrazilIconSvg {...commonIconProps} alt="brazil" />,
  },
  {
    id: "eu",
    regionName: "Europe",
    price: "$9.99",
    iconSvg: <EuropeIconSvg {...commonIconProps} alt="europe" />,
  },
  {
    id: "cauk",
    regionName: "Canada, Australia, UK & Ireland",
    price: "$9.99",
    iconSvg: <UKIconSvg {...commonIconProps} alt="uk" />,
  },
];
