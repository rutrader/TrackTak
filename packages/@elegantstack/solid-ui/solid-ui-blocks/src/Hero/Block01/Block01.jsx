import React from 'react'
import { Container, Flex, Box, css } from 'theme-ui'
import ContentText from '@solid-ui-components/ContentText'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import QuickSignupForm from '@solid-ui-components/QuickSignupForm'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const HeroBlock01 = ({ content: { text = [], buttons, form }, reverse }) => (
  <Container>
    <Flex
      sx={{
        flexDirection: [reverse ? `column-reverse` : `column`]
      }}
    >
      <Box
        sx={{
          position: `relative`,
          textAlign: `center`
        }}
      >
        <iframe
          title='Powersheet Demo'
          src='https://storybook.powersheet.io/?path=/story/spreadsheet--default'
          height={700}
          width='100%'
          style={{
            border: 'none',
            borderRadius: '4px'
          }}
        ></iframe>
      </Box>
      <Box
        sx={{
          flexBasis: `2/5`,
          textAlign: `center`
        }}
      >
        <Reveal effect='fadeInDown'>
          <Box
            sx={{
              margin: '0 auto',
              maxWidth: 900
            }}
          >
            <ContentText content={text} />
          </Box>
        </Reveal>
        {buttons && (
          <Reveal effect='fadeInRight' delay={1} css={css({ mb: 4 })}>
            {buttons && (
              <>
                <Divider space={3} />
                <ContentButtons content={buttons} />
              </>
            )}
          </Reveal>
        )}
        {form && (
          <Reveal effect='fadeInRight' delay={1} css={css({ mb: [4] })}>
            <QuickSignupForm {...form} space={3} />
          </Reveal>
        )}
      </Box>
    </Flex>
  </Container>
)

export default WithDefaultContent(HeroBlock01)
