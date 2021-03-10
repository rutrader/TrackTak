import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import resourceName from "../../../shared/resourceName";
import { graphql } from "gatsby";
import { SyntheticCreditRating } from "@tracktak/dcf-react";

export const query = graphql`
  query SyntheticCreditRatingQuery($ticker: String) {
    stockFundamentals(ticker: { eq: $ticker }) {
      ...Fundamentals
    }
  }
`;

const SyntheticCreditRatingPage = ({ data }) => {
  const { General, ticker } = data.stockFundamentals;

  return (
    <>
      <Helmet>
        <title>{getTitle(`${General.Name} Credit Rating`)}</title>
        <link
          rel="canonical"
          href={`${resourceName}/synthetic-credit-rating/${ticker}`}
        />
      </Helmet>
      <SyntheticCreditRating />
    </>
  );
};

export default SyntheticCreditRatingPage;
