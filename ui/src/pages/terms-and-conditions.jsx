import React from "react";
import { graphql } from "gatsby";
import { Typography } from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import resourceName from "../shared/resourceName";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";

export const query = graphql`
  query TermsAndConditionsQuery {
    contentfulTermsAndConditionsDescription {
      termsAndConditionsDescription {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;

const renderHtml = (html) => {
  return <ReactMarkdown allowDangerousHtml>{html}</ReactMarkdown>;
};

const TermsAndConditions = ({ data }) => {
  const { termsAndConditionsDescription } = data.termsAndConditionsDescription;
  return (
    <>
      <Helmet>
        <title>{getTitle("Privacy Policy")}</title>
        <link rel="canonical" href={`${resourceName}/terms-and-conditions`} />
        <meta name="description" content="Our terms and conditions" />
      </Helmet>
      <Typography component="div" paragraph>
        {renderHtml(termsAndConditionsDescription.childMarkdownRemark.html)}
      </Typography>
    </>
  );
};

export default TermsAndConditions;
