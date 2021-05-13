import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import resourceName from "../../../shared/resourceName";
import {
  selectGeneral,
  useTicker,
  FinancialStatements,
} from "@tracktak/intrinsic-valuations";
import { useSelector } from "react-redux";

const FinancialStatementsPage = () => {
  const general = useSelector(selectGeneral);
  const ticker = useTicker();

  return (
    <>
      <Helmet>
        <title>{getTitle(`${general.name} Financial Statements`)}</title>
        <link
          rel="canonical"
          href={`${resourceName}/financial-statements/${ticker}`}
        />
        <meta
          name="description"
          content={`30+ years Income Statement, Balance Sheet and Cash Flow Statement financial data for ${general.name}.`}
        />
      </Helmet>
      <FinancialStatements />
    </>
  );
};

export default FinancialStatementsPage;
