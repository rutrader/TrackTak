import React from 'react'
import { Container, Flex, Box, css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentText from '@solid-ui-components/ContentText'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentContainer from '@solid-ui-components/ContentContainer'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const styles = {
  avatar: {
    height: 230,
    bg: `omegaLight`,
    borderTopColor: `omegaLight`,
    borderTopWidth: `xxl`,
    borderTopStyle: `solid`,
    borderBottomColor: `beta`,
    borderBottomWidth: `md`,
    borderBottomStyle: `solid`,
    boxSizing: `content-box`,
    borderRadius: `top`,
    mx: `auto`,
    img: {
      borderRadius: `top`,
      objectPosition: `top center !important`
    }
  }
}

const TeamsBlock02 = ({ content: { text, collection } }) => (
  <Container>
    <Box sx={{ textAlign: `center` }}>
      <ContentText content={text} />
    </Box>
    {text && collection && <Divider />}
    <Flex sx={{ m: -3, flexWrap: `wrap`, justifyContent: `center` }}>
      {collection?.map(({ container, avatar, text }, index) => (
        <Box
          key={`item-${index}`}
          sx={{
            flexBasis: [`1/2`, null, `1/3`, `1/5`],
            flexGrow: 1,
            maxWidth: 240,
            p: 3
          }}
        >
          <Reveal
            effect='fadeInLeft'
            delay={0.25 * (index + 2)}
            css={css({ height: `100%` })}
          >
            <ContentContainer
              content={container}
              variant='cards.primary'
              sx={{ textAlign: `center`, height: `100%`, p: 2 }}
            >
              <ContentImages
                content={{ images: [avatar] }}
                sx={styles.avatar}
                imageEffect='fadeIn'
              />
              <Flex sx={{ flexDirection: `column` }} p='3' px='3'>
                <ContentText content={text} />
              </Flex>
            </ContentContainer>
          </Reveal>
        </Box>
      ))}
    </Flex>
  </Container>
)

export default WithDefaultContent(TeamsBlock02)
