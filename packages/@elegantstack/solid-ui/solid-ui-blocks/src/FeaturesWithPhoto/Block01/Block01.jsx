import React from 'react'
import { Container, Flex, Box } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ListItem from '@solid-ui-components/ListItem'
import FlexImage from '@solid-ui-components/FlexImage'
import FlexContent from '@solid-ui-components/FlexContent'
import FlexOverlapFade from '@solid-ui-components/FlexOverlapFade'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentButtons from '@solid-ui-components/ContentButtons'
import ContentText from '@solid-ui-components/ContentText'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const FeaturesWithPhotoBlock01 = ({
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
            <Reveal
              effect={reverse ? 'fadeInRight' : 'fadeInLeft'}
              duration={1.5}
            >
              {collection.map((props, index) => (
                <>
                  <ListItem key={`item-${index}`} {...props} />
                  <Divider space={2} />
                </>
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

export default WithDefaultContent(FeaturesWithPhotoBlock01)
