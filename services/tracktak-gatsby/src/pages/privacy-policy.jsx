import React from 'react'
import { graphql } from 'gatsby'
import { Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import { utils } from '@tracktak/common'
import { Helmet } from 'react-helmet'
import raw from 'rehype-raw'

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
`

const renderHtml = html => {
  return <ReactMarkdown rehypePlugins={[raw]}>{html}</ReactMarkdown>
}

const PrivacyPolicy = ({ data }) => {
  const { privacyPolicyDescription } = data.contentfulPrivacyPolicy
  return (
    <>
      <Helmet>
        <title>{utils.getTitle('Privacy Policy')}</title>
        <link rel='canonical' href={`${utils.resourceName}/privacy-policy`} />
        <meta name='description' content='Our privacy policy' />
      </Helmet>
      <Typography component='div' paragraph>
        {renderHtml(privacyPolicyDescription.childMarkdownRemark.html)}
      </Typography>
    </>
  )
}

export default PrivacyPolicy
