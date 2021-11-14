import React from 'react'
import { graphql } from 'gatsby'
import { Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import { Helmet } from 'react-helmet'
import { utils } from '@tracktak/common'
import raw from 'rehype-raw'

export const query = graphql`
  query TermsAndConditionsQuery {
    contentfulTermsAndConditions {
      termsAndConditionsDescription {
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

const TermsAndConditions = ({ data }) => {
  const { termsAndConditionsDescription } = data.contentfulTermsAndConditions
  return (
    <>
      <Helmet>
        <title>{utils.getTitle('Terms & Conditions')}</title>
        <link
          rel='canonical'
          href={`${utils.resourceName}/terms-and-conditions`}
        />
        <meta name='description' content='Our terms and conditions' />
      </Helmet>
      <Typography component='div' paragraph>
        {renderHtml(termsAndConditionsDescription.childMarkdownRemark.html)}
      </Typography>
    </>
  )
}

export default TermsAndConditions
