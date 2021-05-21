import React from "react";
import { graphql } from "gatsby";
import { Typography } from "@material-ui/core";
import ReactMarkdown from "react-markdown";

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
    <Typography component="div" paragraph>
      {renderHtml(cookieDescription.childMarkdownRemark.html)}
    </Typography>
  );
};

export default CookiePolicy;
