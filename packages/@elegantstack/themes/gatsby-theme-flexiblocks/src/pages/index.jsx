import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import Demos from '@solid-ui-blocks/Gallery/Block01'
import Brand from '@solid-ui-blocks/FeaturesWithPhoto/Block03'
import PoweredByGatsby from '@solid-ui-components/PoweredByGatsby'
import { normalizeBlockContentNodes } from '@blocks-helpers'

const styles = {
  poweredByContainer: {
    textAlign: `center`,
    fontSize: 4,
    'a > svg': {
      height: 35
    }
  }
}

const HomePage = props => {
  const { allBlockContent } = props.data
  const content = normalizeBlockContentNodes(allBlockContent?.nodes)

  return (
    <Layout {...props}>
      <Seo title='Home' />
      <Divider space='5' />
      <Brand content={content['brand']} />
      <Divider space='3' />
      <Container sx={styles.poweredByContainer}>
        <PoweredByGatsby />
      </Container>
      <Divider space='4' />
      <Demos content={content['demos']} />
      <Divider space='6' />
    </Layout>
  )
}

export const query = graphql`
  query miscIndexBlockContent {
    allBlockContent(filter: { page: { in: ["demos"] } }) {
      nodes {
        ...BlockContent
      }
    }
  }
`

export default HomePage
