import React from 'react'
import { Container, Box } from 'theme-ui'
import ContentText from '@solid-ui-components/ContentText'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentButtons from '@solid-ui-components/ContentButtons'
import QuickSignupForm from '@solid-ui-components/QuickSignupForm'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const HeroBlock02 = ({ content: { text, buttons, form, images } }) => (
  <Container sx={{ textAlign: `center` }}>
    <Reveal effect='fadeInDown'>
      <ContentText content={text} />
    </Reveal>
    {buttons && (
      <>
        <Divider space={3} />
        <Reveal effect='fadeInUp' duration={0.7}>
          <ContentButtons content={buttons} />
        </Reveal>
      </>
    )}
    {form && (
      <>
        <Divider space={4} />
        <Reveal effect='fadeInRight' delay={0.7}>
          <QuickSignupForm {...form} space={3} />
        </Reveal>
      </>
    )}
    {images && (
      <>
        <Divider space={4} />
        <Box sx={{ position: `relative` }}>
          <ContentImages
            content={{ images }}
            loading='eager'
            imagePosition='center'
            imageEffect='fadeInUp'
          />
        </Box>
      </>
    )}
  </Container>
)

export default WithDefaultContent(HeroBlock02)
