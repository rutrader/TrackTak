import React from 'react'
import { getImage } from 'gatsby-plugin-image'
import { Container, Flex, Box, css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentContainer from '@solid-ui-components/ContentContainer'
import ContentText from '@solid-ui-components/ContentText'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const styles = {
  listItem: {
    flexBasis: [`1`, `1/2`, null, `1/3`],
    p: 3
  }
}

const GalleryBlock01 = ({ content: { text, collection } }) => (
  <Container>
    <Box sx={{ textAlign: `center` }}>
      <ContentText content={text} />
    </Box>
    {collection && text && <Divider />}
    <Flex sx={{ flexWrap: `wrap` }} m={-3}>
      {collection?.map(({ container, text, buttons, images }, index) => (
        <Reveal
          key={`item-${index}`}
          effect='fadeInGrow'
          threshold={0.2}
          delay={0.15 * (index > 2 ? index - 2 : index + 1)}
          css={css(styles.listItem)}
        >
          <ContentContainer
            content={container}
            variant='cards.interactive'
            sx={{
              height: `full`,
              overflow: `hidden`,
              display: `block`,
              maxWidth: getImage(images?.[0].src)?.width,
              mx: `auto`
            }}
          >
            <ContentImages
              content={{ images }}
              imagePosition='center'
              threshold={0.1}
            />
            <Box sx={{ textAlign: `center` }} p='4'>
              <ContentText content={text} />
              {buttons && (
                <Divider>
                  <Divider space={3} />
                  <ContentButtons content={buttons} />
                </Divider>
              )}
            </Box>
          </ContentContainer>
        </Reveal>
      ))}
    </Flex>
  </Container>
)

export default WithDefaultContent(GalleryBlock01)
