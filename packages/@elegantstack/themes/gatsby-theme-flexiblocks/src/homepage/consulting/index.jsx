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
import BuildBrand from '@solid-ui-blocks/FeaturesWithPhoto/Block04'
import FeatureOne from '@solid-ui-blocks/FeaturesWithPhoto/Block01'
import WhyChooseUs from '@solid-ui-blocks/Features/Block04'
import FeatureTwo from '@solid-ui-blocks/FeaturesWithPhoto/Block02'
import Stats from '@solid-ui-blocks/Stats/Block01'
import Strategies from '@solid-ui-blocks/Features/Block06'
import Download from '@solid-ui-blocks/CallToAction/Block02'
import Testimonials from '@solid-ui-blocks/Testimonials/Block02'
import GetStarted from '@solid-ui-blocks/CallToAction/Block01'
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
      <Container variant='full' sx={styles.heroContainer}>
        <Hero content={content['hero']} reverse />
      </Container>
      <Divider space='4' />
      <Companies content={content['companies']} />
      <Divider space='5' />
      <Divider space='5' />
      <Container variant='full' sx={styles.buildBrandContainer}>
        <BuildBrand content={content['build-brand']} />
      </Container>
      <Divider space='5' />
      <Divider space='5' />
      <FeatureOne content={content['feature-one']} />
      <Divider space='5' />
      <Divider space='5' />
      <WhyChooseUs content={content['why-choose-us']} />
      <Divider space='5' />
      <Divider space='5' />
      <FeatureTwo content={content['feature-two']} reverse />
      <Divider space='5' />
      <Divider space='5' />
      <Stats content={content['stats']} />
      <Divider space='4' />
      <Strategies content={content['strategies']} />
      <Divider space='4' />
      <Download content={content['download']} />
      <Divider space='5' />
      <Divider space='5' />
      <Testimonials content={content['testimonials']} />
      <Divider space='5' />
      <Divider space='5' />
      <Container sx={styles.getStartedContainer}>
        <GetStarted content={content['get-started']} />
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
  query homepageConsultingBlockContent {
    allBlockContent(
      filter: { page: { in: ["homepage/consulting", "shared"] } }
    ) {
      nodes {
        ...BlockContent
      }
    }
  }
`
export default IndexPage
