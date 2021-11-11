import React from 'react'
import { Container, Flex, Box, css } from 'theme-ui'
import Divider from '@solid-ui-components/Divider'
import Reveal from '@solid-ui-components/Reveal'
import ListItem from '@solid-ui-components/ListItem'
import ContentContainer from '@solid-ui-components/ContentContainer'
import ContentText from '@solid-ui-components/ContentText'
import Icon from '@solid-ui-components/ContentIcon'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const styles = {
  listItem: {
    flex: `1 1 0`,
    minWidth: 300,
    p: 3
  },
  itemDescription: {
    flexBasis: `3/5`,
    flexGrow: 1,
    order: [1, null, 0],
    mb: 3
  }
}

const FeaturesBlock05 = ({ content: { text, collection } }) => (
  <Container as={Reveal}>
    <Box sx={{ textAlign: `center` }}>
      <ContentText content={text} />
    </Box>
    {collection && (
      <>
        <Divider />
        <Flex sx={{ flexWrap: `wrap` }} m={-3}>
          {collection.map(
            ({ text, icon, collection, buttons, container }, index) => (
              <Reveal
                key={`item-${index}`}
                effect='fadeInGrow'
                delay={0.15 * (index + 1)}
                css={css(styles.listItem)}
              >
                <ContentContainer
                  content={container}
                  variant='cards.paper'
                  sx={{ height: `full` }}
                >
                  <Icon content={icon} size='md' mr='3' mb='3' />
                  <ContentText content={text?.[0]} />
                  <Flex sx={{ alignItems: `center`, flexWrap: `wrap` }}>
                    <ContentText
                      content={text?.slice(1)}
                      sx={styles.itemDescription}
                      mt={[3, null, 0]}
                    />
                    {collection && (
                      <Box sx={{ flexGrow: 1, mr: [3, null, 0] }}>
                        {collection.map((props, index) => (
                          <ListItem key={`item-${index}`} {...props} compact />
                        ))}
                      </Box>
                    )}
                  </Flex>
                  {buttons && (
                    <>
                      <Divider space={3} />
                      <ContentButtons content={buttons} />
                    </>
                  )}
                </ContentContainer>
              </Reveal>
            )
          )}
        </Flex>
      </>
    )}
  </Container>
)

export default WithDefaultContent(FeaturesBlock05)
