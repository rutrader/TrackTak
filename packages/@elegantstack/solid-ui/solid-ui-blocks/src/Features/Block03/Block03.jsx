import React from 'react'
import { Container, Flex, Box, Heading, css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentText from '@solid-ui-components/ContentText'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const styles = {
  listItem: {
    alignItems: `stretch`,
    justifyContent: `flex-start`
  },
  line: {
    position: `absolute`,
    bottom: `10px`,
    left: `50%`,
    width: `1px`,
    height: t => `calc(100% - ${t.sizes.icon.md + 20}px)`,
    transform: `translateX(-50%)`,
    zIndex: 1,
    bg: `omega`
  },
  number: {
    color: `white`,
    fontWeight: `body`,
    borderRadius: `full`,
    bg: `alpha`,
    size: `icon.md`,
    textAlign: `center`,
    p: 2,
    mb: 0
  }
}

const FeaturesBlock03 = ({ content: { text, buttons, collection } }) => (
  <Container>
    <Flex sx={{ flexDirection: [`column`, null, `row`], m: [0, -4] }}>
      <Box
        sx={{
          flexBasis: [`1`, `1/2`],
          alignSelf: `center`,
          mx: 4,
          mb: [5, null, 0]
        }}
      >
        <Reveal effect='fadeInDown'>
          <Box sx={{ textAlign: `left` }}>
            <ContentText content={text} />
          </Box>
          {buttons && (
            <>
              <Divider space={3} />
              <ContentButtons content={buttons} />
            </>
          )}
        </Reveal>
      </Box>
      {collection && (
        <Box
          sx={{
            flexBasis: [`1`, `1/2`],
            alignSelf: `start`,
            mx: 4
          }}
        >
          <Flex sx={{ flexWrap: `wrap` }}>
            {collection.map(({ text }, index) => (
              <Reveal
                key={`item-${index}`}
                effect='fadeInDown'
                delay={0.2 * (index + 1)}
                css={css({ flexBasis: [`1`, null, null, `1`] })}
              >
                <Flex sx={styles.listItem}>
                  <Box sx={{ position: `relative`, flexShrink: 0, mr: 4 }}>
                    <Heading variant='h4' as='div' sx={styles.number}>
                      {index + 1}
                    </Heading>
                    {index + 1 < collection.length && <Box sx={styles.line} />}
                  </Box>
                  <Box>
                    <ContentText content={text} />
                    {index + 1 < collection.length && <Divider space={3} />}
                  </Box>
                </Flex>
              </Reveal>
            ))}
          </Flex>
        </Box>
      )}
    </Flex>
  </Container>
)

export default WithDefaultContent(FeaturesBlock03)
