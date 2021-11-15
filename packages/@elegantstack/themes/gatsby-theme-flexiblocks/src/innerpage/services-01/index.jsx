import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01'
import ModalSimple from '@solid-ui-blocks/Modal/Block02'
import Header from '@solid-ui-blocks/Header/Block01'
import Features from '@solid-ui-blocks/Features/Block06'
import Clients from '@solid-ui-blocks/FeaturesWithPhoto/Block05'
import Companies from '@solid-ui-blocks/Companies/Block01'
import Team from '@solid-ui-blocks/Hero/Block03'
import Faq from '@solid-ui-blocks/Faq/Block02'
import Footer from '@solid-ui-blocks/Footer/Block01'
import { normalizeBlockContentNodes } from '@blocks-helpers'
import styles from './_styles'

const Services01 = props => {
  const { allBlockContent } = props.data
  const content = normalizeBlockContentNodes(allBlockContent?.nodes)

  return (
    <Layout {...props}>
      <Seo title='Home' />
      {/* Modals */}
      <ModalWithTabs content={content['authentication']} reverse />
      <ModalWithTabs content={content['contact']} />
      <ModalSimple content={content['advertisement']} />
      {/* Blocks */}
      <Header content={content['header']} />
      <Container variant='full' sx={styles.heroContainer}>
        <Features content={content['features']} />
      </Container>
      <Divider space='5' />
      <Divider space='5' />
      <Clients content={content['clients']} />
      <Divider space='4' />
      <Companies content={content['companies']} />
      <Divider space='5' />
      <Divider space='5' />
      <Team content={content['team']} />
      <Divider space='5' />
      <Divider space='5' />
      <Faq content={content['faq']} />
      <Divider space='5' />
      <Divider space='5' />
      <Footer content={content['footer']} />
    </Layout>
  )
}

export const query = graphql`
  query innerpageServices01BlockContent {
    allBlockContent(
      filter: { page: { in: ["innerpage/services-01", "shared"] } }
    ) {
      nodes {
        ...BlockContent
      }
    }
  }
`

export default Services01
