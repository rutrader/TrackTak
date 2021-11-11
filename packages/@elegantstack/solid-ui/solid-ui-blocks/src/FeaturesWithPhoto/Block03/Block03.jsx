import React from 'react'
import { Container, Box, css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentText from '@solid-ui-components/ContentText'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const FeaturesWithPhotoBlock03 = ({ content: { text, buttons, images } }) => (
  <Container sx={{ textAlign: `center` }}>
    <Box>
      {text && (
        <Reveal effect='fadeInDown'>
          <ContentText content={text} />
        </Reveal>
      )}
      {buttons && (
        <>
          <Divider space={3} />
          <ContentButtons content={buttons} />
        </>
      )}
    </Box>
    {images && (
      <>
        <Divider space={3} />
        <Box sx={{ position: `relative` }}>
          <ContentImages
            content={{ images }}
            loading='eager'
            imagePosition='center'
            imageEffect='fadeInDown'
          />
        </Box>
      </>
    )}
  </Container>
)

export default WithDefaultContent(FeaturesWithPhotoBlock03)
