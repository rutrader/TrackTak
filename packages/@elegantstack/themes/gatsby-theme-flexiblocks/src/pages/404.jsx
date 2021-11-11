import React from 'react'
import { graphql } from 'gatsby'
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import Header from '@solid-ui-blocks/Header/Block01'
import Message from '@solid-ui-blocks/FeaturesWithPhoto/Block01'
import { normalizeBlockContentNodes } from '@blocks-helpers'

const NotFoundPage = props => {
  const { allBlockContent } = props.data
  const content = normalizeBlockContentNodes(allBlockContent?.nodes)

  return (
    <Layout {...props}>
      <Seo title='Home' />
      <Header content={content['header']} />
      <Divider space='5' />
      <Divider space='5' />
      <Message content={content['404']} reverse />
    </Layout>
  )
}

export const query = graphql`
  query misc404BlockContent {
    allBlockContent(filter: { page: { in: ["innerpage/404", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
  }
`

export default NotFoundPage
