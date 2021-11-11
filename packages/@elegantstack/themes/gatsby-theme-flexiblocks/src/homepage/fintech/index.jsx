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
import Companies from '@solid-ui-blocks/Companies/Block01'
import Features from '@solid-ui-blocks/Features/Block05'
import FeatureOne from '@solid-ui-blocks/FeaturesWithPhoto/Block07'
import WhyChooseUs from '@solid-ui-blocks/Features/Block01'
import FeatureTwo from '@solid-ui-blocks/FeaturesWithPhoto/Block06'
import FeatureThree from '@solid-ui-blocks/FeaturesWithPhoto/Block03'
import FeatureThreeMore from '@solid-ui-blocks/Features/Block06'
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
      <Header content={content['header']} />
      <Divider space='4' />
      <Divider space='4' />
      <Container variant='wide' sx={styles.heroContainer}>
        <Hero content={content['hero']} reverse />
      </Container>
      <Divider space='4' />
      <Companies content={content['companies']} />
      <Divider space='5' />
      <Divider space='5' />
      <Features content={content['features']} />
      <Divider space='5' />
      <Divider space='5' />
      <Container variant='wide' sx={styles.featureOneContainer}>
        <FeatureOne content={content['feature-one']} />
      </Container>
      <Divider space='5' />
      <Divider space='5' />
      <Container variant='wide' sx={styles.whyChooseUsContainer}>
        <WhyChooseUs content={content['why-choose-us']} />
      </Container>
      <Divider space='5' />
      <Divider space='5' />
      <Container variant='wide' sx={styles.featureTwoContainer}>
        <FeatureTwo content={content['feature-two']} reverse />
      </Container>
      <Divider space='5' />
      <Divider space='5' />
      <Container variant='full' sx={styles.featureThreeContainer}>
        <FeatureThree content={content['feature-three']} />
        <Divider space='4' />
        <FeatureThreeMore content={content['feature-three-more']} />
      </Container>
      <Divider space='5' />
      <Divider space='5' />
      <Blog content={content['latest-blogs']} />
      <Divider space='5' />
      <Footer content={content['footer']} />
    </Layout>
  )
}

export const query = graphql`
  query homepageFintechBlockContent {
    allBlockContent(filter: { page: { in: ["homepage/fintech", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
  }
`
export default IndexPage
