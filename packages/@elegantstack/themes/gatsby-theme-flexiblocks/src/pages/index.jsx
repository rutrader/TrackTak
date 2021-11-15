import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import Hero from '@solid-ui-blocks/Hero/Block01'
import FeaturesOne from '@solid-ui-blocks/Features/Block06'
import FeaturesTwo from '@solid-ui-blocks/Features/Block07'
import { normalizeBlockContentNodes } from '@blocks-helpers'
import GetStarted from '@solid-ui-blocks/Stats/Block01'
import theme from './_theme'
import styles from './_styles'

const HomePage = props => {
  const { allBlockContent } = props.data
  const content = normalizeBlockContentNodes(allBlockContent?.nodes)

  return (
    <Layout theme={theme} {...props}>
      <Seo title='Home' />
      {/* Blocks */}
      <Divider space='4' />
      <Container variant='full' sx={styles.heroContainer}>
        <Hero content={content['hero']} reverse />
      </Container>
      <Divider space='4' />
      <Divider space='4' />
      <FeaturesOne content={content['features-one']} />
      <Divider space='4' />
      <Divider space='4' />
      <FeaturesTwo content={content['features-two']} />
      <Divider space='5' />
      <GetStarted content={content['get-started']} />
      <Divider space='5' />
    </Layout>
  )
}

export const query = graphql`
  query indexBlockContent {
    allBlockContent(filter: { page: { in: ["homepage/saas-v2", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
  }
`

export default HomePage
