import React, { useState } from 'react'
import { Container, Flex, Box, css } from 'theme-ui'
import { FaDotCircle } from 'react-icons/fa'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ListItem from '@solid-ui-components/ListItem'
import ContentText from '@solid-ui-components/ContentText'
import ContentImages from '@solid-ui-components/ContentImages'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const styles = {
  container: {
    background: `linear-gradient(
      0,
      #f6f7fb 0%,
      #e0e7ef 100%
    )`,
    py: [5, 5, 6]
  },
  controlWrapper: {
    position: `absolute`,
    bottom: 0,
    left: 0
  },
  control: {
    color: `omega`,
    cursor: `pointer`,
    transition: `all 0.2s ease-in`,
    mr: 2,
    ':hover': {
      color: `omegaDark`
    },
    '&.active': {
      color: `alpha`
    }
  },
  avatar: {
    borderTopColor: `omegaLighter`,
    borderTopWidth: 30,
    borderTopStyle: `solid`,
    bg: `omegaLighter`,
    borderRadius: `lg`,
    mx: `auto`,
    mb: [4, 0],
    mt: [5, 0],
    img: {
      borderRadius: `lg`
    }
  }
}

const TestimonialsBlock04 = ({ content: { text, collection }, reverse }) => {
  const [state, setState] = useState(0)

  return (
    <Container>
      <ContentText content={text} />
      <Divider />
      <Container>
        {collection.map(
          ({ text, avatar, icon }, index) =>
            index === state && (
              <Flex
                sx={{
                  alignItems: [null, `center`],
                  flexDirection: [
                    reverse ? `column-reverse` : `column`,

                    reverse ? `row-reverse` : `row`
                  ]
                }}
              >
                <Box
                  sx={{
                    flexBasis: [null, `2/5`],
                    [reverse ? 'ml' : 'mr']: [null, 5],
                    position: `relative`,
                    textAlign: `center`
                  }}
                >
                  <ContentImages
                    content={{ images: [avatar] }}
                    sx={styles.avatar}
                    imageEffect='fadeIn'
                  />
                </Box>
                <Box sx={{ flexBasis: `3/5`, textAlign: [`center`, `left`] }}>
                  <Flex
                    sx={{
                      flexDirection: `column`,
                      minHeight: [`none`, 420],
                      position: `relative`
                    }}
                  >
                    <Reveal effect='fadeInRight'>
                      <ContentText content={text?.slice(0, 3)} />
                      <Box sx={{ display: `inline-block`, textAlign: `left` }}>
                        <ListItem
                          key={`item-${index}`}
                          text={text?.slice(3, 5)}
                          icon={icon}
                          iconProps={{ mr: 2, size: 'md', round: true }}
                          compact
                          center
                        />
                      </Box>
                    </Reveal>
                  </Flex>
                </Box>
              </Flex>
            )
        )}
        <Divider space={2} />
        <Box sx={{ textAlign: `center` }}>
          {Array.from({ length: collection.length }, (_, i) => (
            <FaDotCircle
              size={24}
              css={css(styles.control)}
              className={i === state ? 'active' : undefined}
              onClick={() => setState(i)}
            />
          ))}
        </Box>
      </Container>
    </Container>
  )
}

export default WithDefaultContent(TestimonialsBlock04)
