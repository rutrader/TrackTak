import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import resourceName from "../../../shared/resourceName";
import { graphql } from "gatsby";
import {
  SyntheticCreditRating,
  selectGeneral,
  useTicker,
} from "@tracktak/dcf-react";
import { useSelector } from "react-redux";

export const query = graphql`
  query SyntheticCreditRatingQuery($ticker: String) {
    stockFundamentals(ticker: { eq: $ticker }) {
      ...Fundamentals
    }
  }
`;

const SyntheticCreditRatingPage = () => {
  const general = useSelector(selectGeneral);
  const ticker = useTicker();

  return (
    <>
      <Helmet>
        <title>{getTitle(`${general.name} Credit Rating`)}</title>
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
