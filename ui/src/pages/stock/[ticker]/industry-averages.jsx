import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import resourceName from "../../../shared/resourceName";
import {
  IndustryAverages,
  selectGeneral,
  useTicker,
} from "@tracktak/intrinsic-valuations";
import { useSelector } from "react-redux";

const IndustryAveragesPage = () => {
  const general = useSelector(selectGeneral);
  const ticker = useTicker();

  return (
    <>
      <Helmet>
        <title>
          {getTitle(`${general.name} Industry Average Financial Ratios`)}
        </title>
        <link
          rel="canonical"
          href={`${resourceName}/industry-averages/${ticker}`}
        />
        <meta
          name="description"
          content={`Industry average financial ratios compared to ${general.name}.`}
        />
      </Helmet>
      <IndustryAverages />
    </>
  );
};

export default IndustryAveragesPage;
