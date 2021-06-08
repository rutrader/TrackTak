import React from "react";
import { graphql } from "gatsby";
import { Box, Typography } from "@material-ui/core";
import resourceName from "../../shared/resourceName";
import { Helmet } from "react-helmet";
import getTitle from "../../shared/getTitle";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Section } from "@tracktak/intrinsic-valuations";
import SubscribeMailingList from "../../components/SubscribeMailingList";

export const query = graphql`
  query Blog {
    contentfulBlog {
      dateOfBlog
      blogName
      blogContent {
        raw
      }
    }
  }
`;

const renderField = (field) => {
  return renderRichText(field);
};

const Blog = ({ data }) => {
  const { blogContent, dateOfBlog } = data.contentfulBlog;

  return (
    <>
      <Helmet>
        <title>{getTitle("Blog")}</title>
        <link rel="canonical" href={`${resourceName}/blogs`} />
        <meta name="description" content="Blog" />
      </Helmet>
      <Box>
        {dateOfBlog && (
          <Typography textAlign="right" gutterBottom>
            This write up was done on the {dateOfBlog}
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
