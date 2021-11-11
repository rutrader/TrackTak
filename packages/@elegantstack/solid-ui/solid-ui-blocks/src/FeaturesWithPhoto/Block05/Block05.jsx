import React from 'react'
import { Container, Flex, Box } from 'theme-ui'
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
  items: {
    flexWrap: `wrap`,
    mx: [-2, -4],
    '& > div': {
      flex: 1,
      px: [2, 4],
      textAlign: [`center`, `unset`]
    }
  }
}

const FeaturesWithPhotoBlock05 = ({
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
            <Flex sx={styles.items}>
              {collection.map(({ text }, index) => (
                <Reveal
                  key={`item-${index}`}
                  effect='fadeInPop'
                  delay={0.3 * (index + 1)}
                >
                  <Flex
                    sx={{
                      flexDirection: `column`,
                      height: `full`
                    }}
                  >
                    <ContentText content={text} ml={0} />
                  </Flex>
                </Reveal>
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
      </FlexContent>
    </Flex>
    <FlexOverlapFade direction={reverse ? 'ltr' : 'rtl'} />
  </Container>
)

export default WithDefaultContent(FeaturesWithPhotoBlock05)
