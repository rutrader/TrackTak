import React from 'react'
import { Container, Flex, Box, Card, css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ListItem from '@solid-ui-components/ListItem'
import FlexImage from '@solid-ui-components/FlexImage'
import FlexContent from '@solid-ui-components/FlexContent'
import FlexOverlapFade from '@solid-ui-components/FlexOverlapFade'
import ContentText from '@solid-ui-components/ContentText'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const FeaturesWithPhotoBlock02 = ({
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
        <Box sx={{ textAlign: ['center', 'left'] }}>
          <ContentText content={text} />
        </Box>
        {collection && (
          <>
            <Divider space={3} />
            <Flex sx={{ flexWrap: `wrap`, maxWidth: 500, m: -2 }}>
              {collection.map((props, index) => (
                <Reveal
                  key={`item-${index}`}
                  effect='fadeInPop'
                  delay={1 + 0.2 * (index + 1)}
                  css={css({ flexBasis: [`1`, `1/2`] })}
                >
                  <Card py='3' m='2'>
                    <ListItem {...props} compact middle p='2' />
                  </Card>
                </Reveal>
              ))}
            </Flex>
          </>
        )}
        {buttons && (
          <Box sx={{ textAlign: [`center`, `left`] }}>
            <Divider space={3} />
            <ContentButtons content={buttons} />
          </Box>
        )}
      </FlexContent>
    </Flex>
    <FlexOverlapFade direction={reverse ? 'ltr' : 'rtl'} />
  </Container>
)

export default WithDefaultContent(FeaturesWithPhotoBlock02)
