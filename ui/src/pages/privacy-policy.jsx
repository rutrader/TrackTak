import React from "react";
import { graphql } from "gatsby";
import { Typography } from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import resourceName from "../shared/resourceName";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";

export const query = graphql`
  query PrivacyPolicyQuery {
    contentfulPrivacyPolicy {
      privacyPolicyDescription {
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

const PrivacyPolicy = ({ data }) => {
  const { privacyPolicyDescription } = data.contentfulPrivacyPolicy;
  return (
    <>
      <Helmet>
        <title>{getTitle("Privacy Policy")}</title>
        <link rel="canonical" href={`${resourceName}/privacy-policy`} />
        <meta name="description" content="Our privacy policy" />
      </Helmet>
      <Typography component="div" paragraph>
        {renderHtml(privacyPolicyDescription.childMarkdownRemark.html)}
      </Typography>
    </>
  );
};

export default PrivacyPolicy;
