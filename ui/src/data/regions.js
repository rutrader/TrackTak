import React from "react";
import USAIconSvg from "../assets/united-states.svg";
import ChinaIconSvg from "../assets/china.svg";
import EuropeIconSvg from "../assets/europe.svg";
import UKIconSvg from "../assets/united-kingdom.svg";
import BrazilIconSvg from "../assets/brazil.svg";

export const listAPIregions = [
  {
    id: "usa",
    regionName: "United States",
    price: "$0.00",
    iconSvg: <USAIconSvg alt="usa" />,
  },
  {
    id: "apac",
    regionName: "China & Asia",
    price: "$14.99",
    iconSvg: <ChinaIconSvg alt="china" />,
  },
  {
    id: "lamea",
    regionName: "Latin America, Middle East & Africa",
    price: "$12.99",
    iconSvg: <BrazilIconSvg alt="brazil" />,
  },
  {
    id: "eu",
    regionName: "Europe",
    price: "$9.99",
    iconSvg: <EuropeIconSvg alt="europe" />,
  },
  {
    id: "cauk",
    regionName: "Canada, Australia, UK & Ireland",
    price: "$9.99",
    iconSvg: <UKIconSvg alt="uk" />,
  },
];
