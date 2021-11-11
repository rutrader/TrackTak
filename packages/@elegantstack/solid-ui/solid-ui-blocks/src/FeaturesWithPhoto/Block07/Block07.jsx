import React from 'react'
import { Container, Flex, Box, Heading } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import FlexImage from '@solid-ui-components/FlexImage'
import FlexContent from '@solid-ui-components/FlexContent'
import FlexOverlapFade from '@solid-ui-components/FlexOverlapFade'
import ContentText from '@solid-ui-components/ContentText'
import ContentImages from '@solid-ui-components/ContentImages'
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

const FeaturesWithPhotoBlock07 = ({
  content: { text, images, collection, buttons },
  reverse
}) => (
  <Container sx={{ position: `relative` }}>
    <Flex
      sx={{
        alignItems: [null, `center`],
        flexDirection: [
          reverse ? `column-reverse` : `column`,
          reverse ? `row-reverse` : `row`
        ],
        mx: [null, null, null, -4]
      }}
    >
      <FlexImage reverse={reverse}>
        <ContentImages content={{ images }} reverse={reverse} />
      </FlexImage>
      <FlexContent reverse={reverse}>
        <Box sx={{ textAlign: [`center`, `left`] }}>
          <ContentText content={text} />
        </Box>
        {collection && (
          <>
            <Divider space={3} />
            <Reveal
              effect={reverse ? 'fadeInRight' : 'fadeInLeft'}
              duration={1.5}
            >
              {collection.map(({ text }, index) => (
                <Flex key={`item-${index}`} sx={styles.listItem}>
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
              ))}
            </Reveal>
          </>
        )}
        {buttons && (
          <>
            <Divider space={3} />
            <ContentButtons content={buttons} />
          </>
        )}
      </FlexContent>
    </Flex>
    <FlexOverlapFade direction={reverse ? 'ltr' : 'rtl'} />
  </Container>
)

export default WithDefaultContent(FeaturesWithPhotoBlock07)
