import React from 'react'
import { graphql } from 'gatsby'
import { Box, Typography } from '@mui/material'
import { utils } from '@tracktak/common'
import { Helmet } from 'react-helmet'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { INLINES, BLOCKS } from '@contentful/rich-text-types'
import Img from 'gatsby-image'

export const query = graphql`
  fragment BlogInformation on ContentfulBlog {
    dateOfBlog
    slug
    blogName
    blogTitle
    descriptionBlog
    blogContent {
      raw
      references {
        ... on ContentfulAsset {
          contentful_id
          __typename
          fluid(maxWidth: 3080, quality: 90) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
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

  query Blog($slug: String) {
    contentfulBlog(slug: { eq: $slug }) {
      ...BlogInformation
    }
  }
`

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return <Img {...node.data.target} />
    },
    [INLINES.HYPERLINK]: ({ data }, children) => (
      <a
        href={data.uri}
        target={`${
          data.uri.startsWith(utils.resourceName) ? '_self' : '_blank'
        }`}
        rel={`${
          data.uri.startsWith(utils.resourceName) ? '' : 'noopener noreferrer'
        }`}
      >
        {children}
      </a>
    )
  }
}

const renderField = field => {
  return renderRichText(field, options)
}

const Blog = ({ data }) => {
  const { blogContent, dateOfBlog, slug, blogTitle, descriptionBlog } =
    data.contentfulBlog

  return (
    <>
      <Helmet>
        <title>{utils.getTitle(`${blogTitle}`)}</title>
        <link rel='canonical' href={`${utils.resourceName}/blogs/${slug}`} />
        <meta name='description' content={descriptionBlog} />
      </Helmet>
      <Box>
        {dateOfBlog && (
          <Typography
            gutterBottom
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              flexWrap: 'wrap'
            }}
          >
            This blog was done on the<Box>&nbsp;{dateOfBlog}</Box>
          </Typography>
        )}
      </Box>
      <Typography component='div' paragraph>
        {renderField(blogContent)}
      </Typography>
    </>
  )
}

export default Blog
