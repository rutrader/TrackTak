import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion'
import { Container, Flex, Box } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentText from '@solid-ui-components/ContentText'
import Icon from '@solid-ui-components/ContentIcon'
import ContentContainer from '@solid-ui-components/ContentContainer'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const styles = {
  accordion: {
    '.accordion__button': {
      cursor: `pointer`,
      position: `relative`,
      outline: `none`,
      transition: `all 0.15s ease-in`
    },
    '.accordion__button:hover': {
      opacity: 0.75,
      '&::before': {
        borderColor: `beta`
      }
    },
    '.accordion__button::before': {
      content: `' '`,
      width: `10px`,
      height: `10px`,
      marginRight: `12px`,
      borderBottom: `3px solid currentColor`,
      borderLeft: `3px solid currentColor`,
      position: `absolute`,
      right: 4,
      top: `50%`,
      transform: `translate(0, -50%) rotate(45deg)`,
      transition: `all 0.15s ease-in`
    },
    '.accordion__button[aria-expanded="true"]::before, .accordion__button[aria-selected="true"]::before': {
      transform: `translate(0, -50%) rotate(-45deg)`,
      transition: `transform 0.35s ease-in`
    },
    '[hidden]': {
      display: `none`
    },
    '.accordion__panel': {
      animation: `fadeIn 0.25s ease-in`
    },
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0.5,
        transform: 'translate(0, -15%)'
      },
      '100%': {
        opacity: 1,
        transform: 'translate(0, 0%)'
      }
    }
  }
}

const FaqBlock01 = ({ content: { text, collection } }) => (
  <Container as={Reveal}>
    <Box sx={{ textAlign: `center` }}>
      <ContentText content={text} />
    </Box>
    {text && collection && <Divider />}
    <Box sx={styles.accordion}>
      <Accordion>
        {collection?.map(({ container, text, icon }, index) => (
          <ContentContainer
            content={container}
            key={`item-${index}`}
            variant='cards.primary'
            sx={{ '& + &': { mt: 3 } }}
          >
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <Flex sx={{ alignItems: `center` }} p='3'>
                    <Icon content={icon} size='xs' mr='3' p='2' round />
                    <ContentText content={text?.[0]} mb='0' pr='5' />
                  </Flex>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <ContentText content={text?.[1]} pt='0' pb='4' px='5' ml='2' />
              </AccordionItemPanel>
            </AccordionItem>
          </ContentContainer>
        ))}
      </Accordion>
    </Box>
  </Container>
)

export default WithDefaultContent(FaqBlock01)
