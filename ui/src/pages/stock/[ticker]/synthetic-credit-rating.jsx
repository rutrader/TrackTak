import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import resourceName from "../../../shared/resourceName";
import {
  SyntheticCreditRating,
  selectGeneral,
  useTicker,
} from "@tracktak/dcf-react";
import { useSelector } from "react-redux";

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