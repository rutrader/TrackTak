import React from 'react'
import { Container, Flex, Box, Badge, Link } from 'theme-ui'
import ContentContainer from '@solid-ui-components/ContentContainer'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentText from '@solid-ui-components/ContentText'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

import { FaRegClock } from 'react-icons/fa'

const styles = {
  wrapper: {
    flex: [`100%`, null, null, 1],
    minWidth: 300,
    maxWidth: [`none`, null, null, 500],
    cursor: `pointer`,
    p: 3
  },
  card: {
    overflow: `hidden`,
    height: `full`
  },
  content: {
    alignItems: `stretch`,
    flexDirection: [`row`, null, null, `column`],
    height: `full`
  },
  body: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    flex: 1,
    p: 4
  },
  footerWrapper: {
    alignItems: `center`
  },
  postInfo: {
    flex: 1,
    flexWrap: `wrap`,
    justifyContent: `space-between`,
    color: `omega`,
    ml: 3
  },
  imageWrapper: {
    textAlign: `center`,
    position: `relative`,
    display: `block`,
    height: `full`
  },
  image: {
    display: [`none`, `block`],
    height: `full`,
    bg: `omegaLighter`,
    borderRadius: `default`,
    minHeight: `15rem`,
    div: {
      p: `0 !important`
    }
  },
  avatar: {
    size: 42,
    bg: `omegaLighter`,
    borderRadius: `full`,
    borderStyle: `solid`,
    borderWidth: `md`,
    borderColor: `omegaLighter`,
    boxSizing: `content-box`,
    img: {
      objectPosition: 'top center !important'
    }
  }
}

const BlogBlock01 = ({ content: { text, collection, buttons } }) => (
  <Container>
    <Box sx={{ textAlign: `center` }}>
      <ContentText content={text} />
    </Box>
    <Divider />
    {collection && (
      <Reveal effect='fadeIn'>
        <Flex sx={{ flexWrap: `wrap`, justifyContent: `center`, m: -3 }}>
          {collection.map(
            ({ container, text, images, avatar, buttons }, index) => (
              <Box key={`item-${index}`} sx={styles.wrapper}>
                <ContentContainer
                  content={container}
                  variant='cards.interactive'
                  sx={styles.card}
                >
                  <Flex as='article' sx={styles.content}>
                    {/* Image */}
                    <Box sx={{ flex: [0, 1], m: 2, mb: [null, null, null, 0] }}>
                      <Box sx={styles.imageWrapper}>
                        <ContentImages
                          content={{ images }}
                          sx={styles.image}
                          imageEffect='fadeIn'
                        />
                      </Box>
                    </Box>
                    <Box sx={styles.body}>
                      {/* Category */}
                      {text?.[0]?.text && (
                        <Box sx={{ display: `inline-block` }}>
                          <Box mb='3'>
                            <Badge
                              variant='tag'
                              sx={{ bg: `alphaLighter` }}
                              color={text[0]?.color}
                            >
                              {text[0].text}
                            </Badge>
                          </Box>
                        </Box>
                      )}
                      {/* Title */}
                      <ContentText
                        content={text?.[1]}
                        sx={{ flex: [0, 0, `auto`] }}
                      />
                      {/* Excerpt */}
                      <ContentText
                        content={text?.[2]}
                        variant='small'
                        sx={{ flex: `auto`, mb: 3 }}
                      />
                      {/* Footer */}
                      <Box sx={{ variant: `text.small` }}>
                        <Flex sx={styles.footerWrapper}>
                          <ContentImages
                            content={{ images: [avatar] }}
                            sx={styles.avatar}
                            imageEffect='fadeIn'
                          />
                          <Flex sx={styles.postInfo}>
                            {/* Author */}
                            <ContentText
                              content={text?.[3]}
                              sx={{
                                display: `inline-block`,
                                flexBasis: `full`
                              }}
                            >
                              <Link color={text?.[3]?.color}>
                                <strong>{text?.[3]?.text}</strong>
                              </Link>
                            </ContentText>
                            {/* Info */}
                            <Flex sx={{ alignItems: `center` }}>
                              <ContentText
                                content={text?.[4]}
                                sx={{ display: `inline-block` }}
                                mr='2'
                              >
                                {text?.[4]?.textGroup?.[0]}
                              </ContentText>
                              {text?.[5] && <FaRegClock />}
                              <ContentText
                                content={text?.[5]}
                                sx={{ display: `inline-block` }}
                                ml='2'
                              />
                            </Flex>
                          </Flex>
                        </Flex>
                      </Box>
                      {buttons && (
                        <>
                          <Divider space={2} />
                          <ContentButtons content={buttons} />
                        </>
                      )}
                    </Box>
                  </Flex>
                </ContentContainer>
              </Box>
            )
          )}
        </Flex>
      </Reveal>
    )}
    {buttons && (
      <>
        <Divider space={3} />
        <ContentButtons content={buttons} />
      </>
    )}
  </Container>
)

export default WithDefaultContent(BlogBlock01)
