import React from 'react'
import { graphql } from 'gatsby'
import { Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import { Helmet } from 'react-helmet'
import { utils } from '@tracktak/common'
import raw from 'rehype-raw'

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
`

const renderHtml = html => {
  return <ReactMarkdown rehypePlugins={[raw]}>{html}</ReactMarkdown>
}

const CookiePolicy = ({ data }) => {
  const { cookieDescription } = data.contentfulCookiePolicy

  return (
    <>
      <Helmet>
        <title>{utils.getTitle('Cookie Policy')}</title>
        <link rel='canonical' href={`${utils.resourceName}/cookie-policy`} />
        <meta name='description' content='Our cookie policy' />
      </Helmet>
      <Typography component='div' paragraph>
        {renderHtml(cookieDescription.childMarkdownRemark.html)}
      </Typography>
    </>
  )
}

export default CookiePolicy
