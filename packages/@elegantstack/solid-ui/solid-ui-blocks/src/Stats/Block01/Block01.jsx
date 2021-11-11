import React from 'react'
import { Container, Flex, Box } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import Counter from '@solid-ui-components/Counter'
import ContentContainer from '@solid-ui-components/ContentContainer'
import ContentText from '@solid-ui-components/ContentText'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const StatsBlock01 = ({
  content: { text, container, collection, buttons }
}) => (
  <Container sx={{ textAlign: `center` }}>
    <ContentContainer content={container} variant='cards.paper-lg'>
      <ContentText content={text} />
      {text && collection && <Divider space={3} />}
      {collection && (
        <>
          <Flex
            sx={{
              flexWrap: `wrap`,
              alignItems: `flex-start`,
              alignContent: `center`,
              justifyContent: `center`,
              m: -1
            }}
          >
            {collection?.map(({ text }, index) => (
              <Box
                key={`item-${index}`}
                sx={{
                  flex: `1`,
                  minWidth: 100,
                  textAlign: `center`,
                  p: 1
                }}
              >
                <Reveal effect='fadeInGrow' delay={0.2 * (index + 2)}>
                  <ContentText content={text?.[0]} mb='0'>
                    <Counter to={parseInt(text?.[0]?.text)} />
                  </ContentText>
                  <ContentText
                    content={text?.[1]}
                    sx={{ fontWeight: `body` }}
                    mb='0'
                  />
                </Reveal>
              </Box>
            ))}
          </Flex>
        </>
      )}
      {buttons && (
        <>
          <Divider />
          <ContentButtons content={buttons} />
        </>
      )}
    </ContentContainer>
  </Container>
)

export default WithDefaultContent(StatsBlock01)
