import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import resourceName from "../../../shared/resourceName";
import { IndustryAverages } from "@tracktak/dcf-react";
import { graphql } from "gatsby";

export const query = graphql`
  query IndustryAveragesQuery($ticker: String) {
    stockFundamentals(ticker: { eq: $ticker }) {
      ...Fundamentals
    }
  }
`;

const IndustryAveragesPage = ({ data }) => {
  return (
    <>
      <Helmet>
        <title>
          {getTitle(`${data.General.Name} Industry Average Financial Ratios`)}
        </title>
        <link
          rel="canonical"
          href={`${resourceName}/industry-averages/${data.ticker}`}
        />
      </Helmet>
      <IndustryAverages />
    </>
  );
};

export default IndustryAveragesPage;
