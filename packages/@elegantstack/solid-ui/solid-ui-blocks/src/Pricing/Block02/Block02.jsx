import React, { useState } from 'react'
import { Container, Flex, Box, Badge, css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ListItem from '@solid-ui-components/ListItem'
import Tabs from '@solid-ui-components/Tabs'
import ContentText from '@solid-ui-components/ContentText'
import Icon from '@solid-ui-components/ContentIcon'
import ContentContainer from '@solid-ui-components/ContentContainer'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const styles = {
  middleBox: {
    position: `relative`,
    zIndex: 2
  },
  prevPrice: {
    textDecoration: `line-through`,
    opacity: 0.2
  },
  saveBadge: {
    position: `absolute`,
    top: 3,
    right: 3
  }
}

const PricingBlock02 = ({ content: { text, collection, buttons } }) => {
  const [plan, setPlan] = useState(0)

  return (
    <Container sx={{ textAlign: `left` }}>
      <Box sx={{ textAlign: `center` }}>
        <ContentText content={text?.slice(0, 3)} />
      </Box>
      {text?.[3]?.textGroup && (
        <>
          <Divider space={3} />
          <Tabs tabs={text[3].textGroup} onChange={setPlan} variant='pill' />
        </>
      )}
      {collection && (
        <Flex sx={{ flexWrap: `wrap`, alignItems: `center`, m: -3 }}>
          {collection.map(
            ({ container, text, icon, collection, buttons }, i) => (
              <Box key={`item-${i}`} sx={{ flex: [`auto`, 1], p: 3 }}>
                <Reveal
                  effect={
                    collection.length === 3
                      ? i === 0
                        ? 'fadeInDeepRight'
                        : i === collection.length - 1
                        ? 'fadeInDeepLeft'
                        : null
                      : 'fadeInUp'
                  }
                  css={css(
                    i !== 0 && i !== collection.length - 1 && styles.middleBox
                  )}
                >
                  <ContentContainer
                    content={container}
                    variant='cards.paper'
                    sx={{ position: `relative` }}
                  >
                    {text?.[3]?.textGroup?.[plan] && (
                      <Reveal effect='fadeInRight' css={css(styles.saveBadge)}>
                        <Badge variant='tag-yellow'>
                          {text?.[3].textGroup[plan]}
                        </Badge>
                      </Reveal>
                    )}
                    <Flex sx={{ alignItems: `center` }}>
                      <Box>
                        <Icon content={icon} size='sm' mr='3' />
                      </Box>
                      <Box>
                        <ContentText content={text?.[0]} mb='1' />
                        <Flex
                          sx={{
                            alignItems: `center`,
                            justifyContent: `center`
                          }}
                        >
                          {plan > 0 && (
                            <Reveal effect='fadeInDeepRight'>
                              <ContentText
                                content={{
                                  ...text?.[1],
                                  text: text?.[1]?.textGroup?.[plan]
                                }}
                                mb='0'
                                mr='2'
                              />
                            </Reveal>
                          )}
                          <ContentText
                            content={{
                              ...text?.[1],
                              text:
                                plan > 0
                                  ? text?.[1]?.textGroup?.[0]
                                  : text?.[1]?.textGroup?.[plan]
                            }}
                            mb='0'
                            mr='2'
                            sx={{
                              transition: `all .4s ease-in`,
                              ...(plan > 0 && styles.prevPrice)
                            }}
                          />
                          <ContentText content={text?.[2]} mb='0' mt='2' />
                        </Flex>
                      </Box>
                    </Flex>
                    <Divider
                      space={3}
                      color={text?.[2]?.color || 'omegaLight'}
                      borderTopWidth='1px'
                    />
                    <ContentText content={text?.[4]} mb='0' mx='auto' />
                    {collection && (
                      <>
                        <Divider space={2} />
                        {collection.map((props, index) => (
                          <ListItem key={`item-${index}`} {...props} compact />
                        ))}
                      </>
                    )}
                    {buttons && (
                      <>
                        <Divider space={3} />
                        <ContentButtons content={buttons} />
                      </>
                    )}
                  </ContentContainer>
                </Reveal>
              </Box>
            )
          )}
        </Flex>
      )}
      <ContentButtons content={buttons} />
    </Container>
  )
}

export default WithDefaultContent(PricingBlock02)
