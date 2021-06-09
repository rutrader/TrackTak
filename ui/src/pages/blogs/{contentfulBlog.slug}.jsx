import React from "react";
import { graphql } from "gatsby";
import { Box, Typography } from "@material-ui/core";
import resourceName from "../../shared/resourceName";
import { Helmet } from "react-helmet";
import getTitle from "../../shared/getTitle";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Section } from "@tracktak/intrinsic-valuations";
import SubscribeMailingList from "../../components/SubscribeMailingList";
import { INLINES } from "@contentful/rich-text-types";

export const query = graphql`
  fragment BlogInformation on ContentfulBlog {
    dateOfBlog
    slug
    blogName
    blogTitle
    descriptionBlog
    blogContent {
      raw
    }
    cardImage {
      ... on ContentfulAsset {
        contentful_id
        __typename
        fluid(maxWidth: 200, quality: 80) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }

  query Blog {
    contentfulBlog {
      ...BlogInformation
    }
  }
`;

const options = {
  renderNode: {
    [INLINES.HYPERLINK]: ({ data }, children) => (
      <a
        href={data.uri}
        target={`${data.uri.startsWith(resourceName) ? "_self" : "_blank"}`}
        rel={`${
          data.uri.startsWith(resourceName) ? "" : "noopener noreferrer"
        }`}
      >
        {children}
      </a>
    ),
  },
};

const renderField = (field) => {
  return renderRichText(field, options);
};

const Blog = ({ data }) => {
  const {
    blogContent,
    dateOfBlog,
    slug,
    blogTitle,
    descriptionBlog,
  } = data.contentfulBlog;

  return (
    <>
      <Helmet>
        <title>{getTitle(`${blogTitle}`)}</title>
        <link rel="canonical" href={`${resourceName}/blogs/${slug}`} />
        <meta name="description" content={descriptionBlog} />
      </Helmet>
      <Box>
        {dateOfBlog && (
          <Typography
            gutterBottom
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          >
            This blog was done on the<Box>&nbsp;{dateOfBlog}</Box>
          </Typography>
        )}
      </Box>
      <Typography component="div" paragraph>
        {renderField(blogContent)}
      </Typography>
      <Section sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Get notified immediately when we post a blog.
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <b>Free</b>&nbsp;forever.
            </Box>
          </Typography>
          <SubscribeMailingList subscribeText="Join" locationSignup="Blog" />
        </Box>
      </Section>
    </>
  );
};

export default Blog;
