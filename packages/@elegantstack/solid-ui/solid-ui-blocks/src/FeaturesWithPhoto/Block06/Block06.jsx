import React from 'react'
import { Container, Flex, Box } from 'theme-ui'
import Divider from '@solid-ui-components/Divider'
import ProgressBar from '@solid-ui-components/ProgressBar'
import Counter from '@solid-ui-components/Counter'
import FlexImage from '@solid-ui-components/FlexImage'
import FlexContent from '@solid-ui-components/FlexContent'
import FlexOverlapFade from '@solid-ui-components/FlexOverlapFade'
import ContentText from '@solid-ui-components/ContentText'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const FeaturesWithPhotoBlock06 = ({
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
            {collection.map(({ text }, index) => (
              <Box key={`item-${index}`} mb='4'>
                <Flex
                  sx={{
                    justifyContent: `space-between`,
                    alignItems: `center`,
                    mb: 3,
                    px: 2
                  }}
                >
                  <Box>
                    <ContentText content={text?.slice(0, 2)} />
                  </Box>
                  <ContentText
                    content={text?.[2]}
                    variant='h2'
                    sx={{ color: `omegaDarker` }}
                    mb='0'
                    pl='3'
                  >
                    <Counter from='0' to={text?.[2]?.text} duration={2} />%
                  </ContentText>
                </Flex>
                <ProgressBar
                  color={text?.[2]?.color || undefined}
                  from='0%'
                  to={text?.[2]?.text}
                  duration={2}
                />
              </Box>
            ))}
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

export default WithDefaultContent(FeaturesWithPhotoBlock06)
