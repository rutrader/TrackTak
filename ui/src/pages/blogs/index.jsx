import React from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@material-ui/core";
import { navigate, graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import getTitle from "../../shared/getTitle";
import resourceName from "../../shared/resourceName";
import Img from "gatsby-image";

export const query = graphql`
  query BlogQuery {
    allContentfulBlog {
      edges {
        node {
          blogContent {
            raw
          }
          dateOfBlog
          slug
          blogName
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
      }
    }
  }
`;

const BlogTemplates = ({ data }) => {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>{getTitle("Blog")}</title>
        <link rel="canonical" href={`${resourceName}/blogs`} />
        <meta name="description" content="Blog" />
      </Helmet>
      <Typography variant="h5" gutterBottom>
        Blogs
      </Typography>
      <List>
        {data.allContentfulBlog.edges
          .sort((a, b) => {
            const dateA = new Date(a.node.dateOfBlog);
            const dateB = new Date(b.node.dateOfBlog);

            return dateB - dateA;
          })
          .map(({ node: { slug, dateOfBlog, blogName, cardImage } }) => {
            const blogUrl = `/blogs/${slug}`;

            return (
              <ListItem key={slug}>
                <Card>
                  <CardActionArea
                    style={{ padding: theme.spacing(2) }}
                    onClick={() => {
                      navigate(blogUrl);
                    }}
                  >
                    <Img
                      {...cardImage}
                      style={{
                        float: "left",
                        marginRight: theme.spacing(2.5),
                        width: "150px",
                      }}
                    />
                    <Typography gutterBottom variant="h5">
                      {blogName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      paragraph
                      component="div"
                    ></Typography>
                  </CardActionArea>
                  <CardActions>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <Button
                        to={blogUrl}
                        size="small"
                        color="primary"
                        component={Link}
                      >
                        Learn More
                      </Button>
                      <Typography>{dateOfBlog}</Typography>
                    </Box>
                  </CardActions>
                </Card>
              </ListItem>
            );
          })}
      </List>
    </>
  );
};

export default BlogTemplates;
