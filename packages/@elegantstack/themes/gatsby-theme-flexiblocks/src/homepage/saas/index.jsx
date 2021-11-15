import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01'
import ModalSimple from '@solid-ui-blocks/Modal/Block02'
import Header from '@solid-ui-blocks/Header/Block01'
import Hero from '@solid-ui-blocks/Hero/Block02'
import Features from '@solid-ui-blocks/Features/Block06'
import FeatureTabOne from '@solid-ui-blocks/FeaturesWithPhoto/Block05'
import FeatureTabTwo from '@solid-ui-blocks/FeaturesWithPhoto/Block06'
import FeatureTabThree from '@solid-ui-blocks/FeaturesWithPhoto/Block01'
import Pricing from '@solid-ui-blocks/Pricing/Block01'
import WhyChooseUs from '@solid-ui-blocks/Features/Block04'
import GetStarted from '@solid-ui-blocks/Stats/Block01'
import Testimonials from '@solid-ui-blocks/Testimonials/Block01'
import Companies from '@solid-ui-blocks/Companies/Block01'
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
      <Divider space='5' />
      <Container variant='full' sx={styles.heroContainer}>
        <Hero content={content['hero']} />
      </Container>
      <Divider space='5' />
      <Features content={content['features']} />
      <Divider space='5' />
      <Divider space='5' />
      <Container variant='wide' sx={styles.featuresContainer}>
        <FeatureTabOne content={content['feature-tab-one']} reverse />
        <Divider space='5' />
        <Divider space='5' />
        <FeatureTabTwo content={content['feature-tab-two']} />
        <Divider space='5' />
        <Divider space='5' />
        <FeatureTabThree content={content['feature-tab-three']} reverse />
      </Container>
      <Divider space='5' />
      <Divider space='5' />
      <WhyChooseUs content={content['why-choose-us']} />
      <Divider space='5' />
      <Divider space='5' />
      <Pricing content={content['pricing']} />
      <Divider space='5' />
      <Divider space='5' />
      <Container variant='full' sx={styles.testimonialsContainer}>
        <Testimonials content={content['testimonials']} />
      </Container>
      <Companies content={content['companies']} />
      <Divider space='5' />
      <GetStarted content={content['get-started']} />
      <Divider space='5' />
      <Divider space='5' />
      <Blog content={content['latest-blogs']} />
      <Divider space='5' />
      <Divider space='5' />
      <Footer content={content['footer']} />
    </Layout>
  )
}

export const query = graphql`
  query homepageSaasBlockContent {
    allBlockContent(filter: { page: { in: ["homepage/saas", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
  }
`
export default IndexPage
