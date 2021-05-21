import React from "react";
import { graphql } from "gatsby";
import { Typography } from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import resourceName from "../shared/resourceName";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";

export const query = graphql`
  query CookieDescriptionQuery {
    contentfulCookiePolicy {
      cookieDescription {
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

const CookiePolicy = ({ data }) => {
  const { cookieDescription } = data.contentfulCookiePolicy;

  return (
    <>
      <Helmet>
        <title>{getTitle("Cookie Policy")}</title>
        <link rel="canonical" href={`${resourceName}/cookie policy`} />
        <meta name="description" content="Our cookie policy" />
      </Helmet>
      <Typography component="div" paragraph>
        {renderHtml(cookieDescription.childMarkdownRemark.html)}
      </Typography>
    </>
  );
};

export default CookiePolicy;
