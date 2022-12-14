import React from 'react'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  List,
  ListItem,
  Typography,
  useTheme
} from '@mui/material'
import { navigate, graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import { utils } from '@tracktak/common'
import Img from 'gatsby-image'

export const query = graphql`
  query BlogsQuery {
    allContentfulBlog {
      edges {
        node {
          ...BlogInformation
        }
      }
    }
  }
`

const Blogs = ({ data }) => {
  const theme = useTheme()

  return (
    <>
      <Helmet>
        <title>{utils.getTitle('Blogs')}</title>
        <link rel='canonical' href={`${utils.resourceName}/blogs`} />
        <meta name='description' content='Tracktak blogs' />
      </Helmet>
      <Typography variant='h5' gutterBottom>
        Blogs
      </Typography>
      <List>
        {data.allContentfulBlog.edges
          .sort((a, b) => {
            const dateA = new Date(a.node.dateOfBlog)
            const dateB = new Date(b.node.dateOfBlog)

            return dateB - dateA
          })
          .map(({ node: { slug, dateOfBlog, blogName, cardImage } }) => {
            const blogUrl = `/blogs/${slug}`

            return (
              <ListItem key={slug}>
                <Card sx={{ width: '100%' }}>
                  <CardActionArea
                    style={{ padding: theme.spacing(2) }}
                    onClick={() => {
                      navigate(blogUrl)
                    }}
                  >
                    <Img
                      {...cardImage}
                      style={{
                        float: 'left',
                        marginRight: theme.spacing(2.5),
                        width: '150px'
                      }}
                    />
                    <Typography gutterBottom variant='h5'>
                      {blogName}
                    </Typography>
                  </CardActionArea>
                  <CardActions>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flex: 1
                      }}
                    >
                      <Button
                        to={blogUrl}
                        size='small'
                        color='primary'
                        component={Link}
                      >
                        Learn More
                      </Button>
                      <Typography>{dateOfBlog}</Typography>
                    </Box>
                  </CardActions>
                </Card>
              </ListItem>
            )
          })}
      </List>
    </>
  )
}

export default Blogs
