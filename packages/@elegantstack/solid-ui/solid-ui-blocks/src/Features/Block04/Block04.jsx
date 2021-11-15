import React from 'react'
import { Container, Flex, Box, css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import Icon from '@solid-ui-components/ContentIcon'
import ContentContainer from '@solid-ui-components/ContentContainer'
import ContentText from '@solid-ui-components/ContentText'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const styles = {
  listItem: {
    flexBasis: [`1`, null, `1/2`],
    alignItems: `center`,
    justifyContent: `center`,
    p: [3, 4],
    ':nth-of-type(even)': {
      borderLeftStyle: `solid`,
      borderLeftColor: `rgba(113, 128, 150, 0.2)`,
      borderLeftWidth: [0, null, null, `sm`]
    },
    ':nth-last-of-type(2), :last-child': {
      borderTopStyle: `solid`,
      borderTopColor: `rgba(113, 128, 150, 0.2)`,
      borderTopWidth: [0, null, null, `sm`]
    }
  }
}

const FeaturesBlock04 = ({
  content: { container, text, collection, buttons }
}) => (
  <Container>
    <Box sx={{ textAlign: `center` }}>
      <ContentText content={text} />
    </Box>
    {collection && (
      <>
        <Divider />
        <ContentContainer content={container} as={Reveal} variant='cards.paper'>
          <Flex sx={{ flexWrap: `wrap` }}>
            {collection?.map(({ text, icon }, index) => (
              <Box key={`item-${index}`} css={css(styles.listItem)}>
                {text?.[0] && (
                  <Flex sx={{ alignItems: `center`, mb: 3 }}>
                    <Icon content={icon} size='sm' mr='3' />
                    <ContentText content={text[0]} mb='0' />
                  </Flex>
                )}
                <Box ml={2}>
                  <ContentText content={text?.[1]} />
                  {buttons && (
                    <>
                      <Divider space={2} />
                      <ContentButtons content={buttons} />
                    </>
                  )}
                </Box>
              </Box>
            ))}
          </Flex>
        </ContentContainer>
      </>
    )}
    {buttons && (
      <>
        <Divider space={3} />
        <ContentButtons content={buttons} />
      </>
    )}
  </Container>
)

export default WithDefaultContent(FeaturesBlock04)
