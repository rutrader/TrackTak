import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import resourceName from "../../../shared/resourceName";
import {
  IndustryAverages,
  selectGeneral,
  useTicker,
} from "@tracktak/dcf-react";
import { graphql } from "gatsby";
import { useSelector } from "react-redux";

export const query = graphql`
  query IndustryAveragesQuery($ticker: String) {
    stockFundamentals(ticker: { eq: $ticker }) {
      ...Fundamentals
    }
  }
`;

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
      </Helmet>
      <IndustryAverages />
    </>
  );
};

export default IndustryAveragesPage;
