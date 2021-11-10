import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01'
import ModalSimple from '@solid-ui-blocks/Modal/Block02'
import Header from '@solid-ui-blocks/Header/Block01'
import Hero from '@solid-ui-blocks/Hero/Block01'
import FeaturesOne from '@solid-ui-blocks/Features/Block06'
import FeaturesTwo from '@solid-ui-blocks/Features/Block07'
import Process from '@solid-ui-blocks/Features/Block03'
import Testimonials from '@solid-ui-blocks/Testimonials/Block03'
import Companies from '@solid-ui-blocks/Companies/Block01'
import Pricing from '@solid-ui-blocks/Pricing/Block02'
import Stats from '@solid-ui-blocks/Stats/Block01'
import Faq from '@solid-ui-blocks/Faq/Block01'
import Blog from '@solid-ui-blocks/Blog/Block01'
import Footer from '@solid-ui-blocks/Footer/Block01'
import { normalizeBlockContentNodes } from '@blocks-helpers'
import theme from './_theme'
import styles from './_styles'

const IndexPage = props => {
  const { allBlockContent } = props.data
  const content = normalizeBlockContentNodes(allBlockContent?.nodes)

  return (
    <Layout theme={theme} {...props}>
      <Seo title='Home' />
      {/* Modals */}
      <ModalWithTabs content={content['authentication']} reverse />
      <ModalWithTabs content={content['contact']} />
      <ModalSimple content={content['advertisement']} />
      {/* Blocks */}
      <Header content={content['header-light']} menuJustify='space-between' />
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
      <Footer content={content['footer']} />
    </Layout>
  )
}

export const query = graphql`
  query homepageSaasV2BlockContent {
    allBlockContent(filter: { page: { in: ["homepage/saas-v2", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
  }
`
export default IndexPage
