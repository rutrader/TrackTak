import React, { useContext } from 'react'
import { Box } from 'theme-ui'
import Icon from '@solid-ui-components/ContentIcon'
import ContentContainer from '@solid-ui-components/ContentContainer'
import { ModalContext } from '@solid-ui-components/Modal'
import { TabsContext } from '@solid-ui-components/Tabs'
import { buildLinkProps } from '@solid-ui-components/ContentButtons'
import { BiChevronDown } from 'react-icons/bi'

const styles = {
  horizontal: {
    '.button-group-link': {
      py: 3
    },
    '> * + a, > * + div, > * + button': {
      ml: [3, null, null, 4],
      mt: [4, 0]
    }
  },
  vertical: {
    display: `flex`,
    flexDirection: `column`,
    a: {
      mb: [3, 2],
      px: [2, 0]
    }
  },
  subButtonsParent: {
    display: [null, null, `inline-flex`],
    alignItems: `center`,
    ':hover': {
      '& > .container-level-1': {
        opacity: 1,
        visibility: `inherit`,
        transform: [null, null, `translate(-50%, 0)`]
      }
    },
    '& > svg': {
      size: `icon.xs`,
      position: [`absolute`, `static`],
      right: 0,
      ml: `auto`
    }
  },
  subContainer: {
    '&.container-level-1': {
      position: [`static`, null, `absolute`],
      top: [null, null, `100%`],
      left: [null, null, `50%`],
      transform: [null, null, `translate(-50%, -20px)`],
      boxShadow: [null, null, `0 0 25px rgba(140,152,164,.355)`],
      visibility: [null, null, `hidden`],
      overflow: [null, null, `hidden`],
      opacity: [null, null, 0],
      bg: [`omegaLighter`, null, `contentBg`],
      borderRadius: [null, null, `default`],
      display: `flex`,
      flexDirection: `column`,
      transition: `all 250ms ease`,
      p: [3, null, 0],
      mt: [3, null, 0]
    },
    // Single level
    '&.container-level-1.no-collection': {
      p: [3, null, 3],
      '.button-group-link': {
        px: 2,
        py: 1,
        my: 1
      }
    },
    '&.container-level-2': {
      flexBasis: `100%`,
      mt: [0, 0, 2],
      '.button-group-link': {
        display: `block`,
        py: 0,
        mt: 2
      }
    }
  },
  subContainerCollection: {
    display: `flex`,
    flexDirection: [`column`, null, `row`],
    p: [null, null, 4],
    mt: [3, null, 0],
    '& > .button-group-link': {
      flexBasis: `1/3`,
      display: `flex`,
      flexWrap: `wrap`,
      alignItems: `flex-start`,
      alignContent: `flex-start`,
      minWidth: 210,
      mb: [0, null, `inherit`],
      py: 0
    }
  }
}

const ButtonComponent = ({ content, children, styles = {}, className }) => {
  const { setActiveModal } = useContext(ModalContext)
  const { setActiveTab } = useContext(TabsContext)

  const { type, text, link, target, variant, width, bg, icon } = content

  const { Component, linkProps } = buildLinkProps({
    content: { type, link, target, variant },
    setActiveModal,
    setActiveTab
  })

  return (
    <Component
      variant={variant || 'primary'}
      sx={{
        width,
        '::after': { bg, borderColor: bg },
        position: `relative`,
        ...styles
      }}
      {...linkProps}
      className={[linkProps.className, className].join(' ')}
    >
      <Box sx={{ display: `inline-block` }}>
        <Icon content={icon} size='xs' mr='1' /> {text}
      </Box>

      {children}
    </Component>
  )
}

const ContentButton = ({ content, level = 1 }) => {
  const { collection, buttons } = content
  const className = `level-${level}`

  if (!collection && !buttons)
    return <ButtonComponent content={content} className={className} />

  const ButtonGroup = ({ buttons }) =>
    buttons.map((content, index) => (
      <ContentButton
        key={`item-${index}`}
        level={level + 1}
        content={content}
      />
    ))

  return (
    <ButtonComponent
      content={content}
      styles={styles.subButtonsParent}
      className={className}
    >
      {level === 1 && <BiChevronDown />}
      <Box
        sx={styles.subContainer}
        className={`container-level-${level} ${
          !collection ? 'no-collection' : ''
        }`}
      >
        {collection ? (
          collection.map(({ container, buttons }, index) => (
            <ContentContainer
              key={`item-${index}`}
              content={container}
              sx={styles.subContainerCollection}
            >
              <ButtonGroup buttons={buttons} />
            </ContentContainer>
          ))
        ) : (
          <ButtonGroup buttons={buttons} />
        )}
      </Box>
    </ButtonComponent>
  )
}

const ContentButtons = ({ content, variant, wrapperStyles }) =>
  content ? (
    <>
      <Box sx={{ ...styles[variant], ...wrapperStyles }}>
        {content?.map((content, index) => (
          <ContentButton
            key={`item-${index}`}
            index={index}
            content={content}
          />
        ))}
      </Box>
    </>
  ) : null

export default ContentButtons

ContentButtons.defaultProps = {
  variant: 'horizontal'
}
