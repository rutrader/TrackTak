import React from 'react'
import { Container, Flex, Box } from 'theme-ui'
import ContentContainer from '@solid-ui-components/ContentContainer'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentText from '@solid-ui-components/ContentText'
import Icon from '@solid-ui-components/ContentIcon'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const FeaturesBlock02 = ({ content: { text, collection, buttons } }) => (
  <Container sx={{ textAlign: `center` }}>
    <ContentText content={text} />
    <Reveal effect='fadeInUp'>
      {collection && (
        <>
          <Divider />
          <Flex sx={{ flexWrap: `wrap`, m: -3 }}>
            {collection?.map(({ text, icon, buttons, container }, index) => (
              <Box
                key={`item-${index}`}
                sx={{
                  flexBasis: [`1`, null, `1/2`],
                  textAlign: `left`,
                  p: 3
                }}
              >
                <ContentContainer content={container} variant='cards.paper-lg'>
                  {text?.[0] && (
                    <Flex sx={{ alignItems: `center`, mb: 4 }}>
                      <Icon content={icon} size='sm' mr='3' />
                      <ContentText content={text[0]} mb='0' />
                    </Flex>
                  )}
                  <ContentText content={text?.[1]} />
                  {buttons && (
                    <>
                      <Divider space={2} />
                      <ContentButtons content={buttons} />
                    </>
                  )}
                </ContentContainer>
              </Box>
            ))}
          </Flex>
        </>
      )}
      {buttons && (
        <>
          <Divider space={3} />
          <ContentButtons content={buttons} />
        </>
      )}
    </Reveal>
  </Container>
)

export default WithDefaultContent(FeaturesBlock02)
