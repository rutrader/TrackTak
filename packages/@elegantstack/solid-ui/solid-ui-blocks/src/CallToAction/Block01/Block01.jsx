import React from 'react'
import { Container } from 'theme-ui'
import Divider from '@solid-ui-components/Divider'
import ContentContainer from '@solid-ui-components/ContentContainer'
import ContentText from '@solid-ui-components/ContentText'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const CallToActionBlock01 = ({ content: { container, text, buttons } }) => (
  <Container sx={{ textAlign: `center` }}>
    <ContentText content={text?.slice(0, 2)} />
    <ContentContainer content={container} variant='cards.paper-lg'>
      <ContentText content={text?.slice(2)} />
      {buttons && (
        <>
          <Divider space={3} />
          <ContentButtons content={buttons} />
        </>
      )}
    </ContentContainer>
  </Container>
)

export default WithDefaultContent(CallToActionBlock01)
