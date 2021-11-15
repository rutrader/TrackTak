import React, { useContext } from 'react'
import mergeWith from 'lodash.mergewith'
import { Box, useThemeUI } from 'theme-ui'
import { ModalContext } from '@solid-ui-components/Modal'
import { TabsContext } from '@solid-ui-components/Tabs'
import { buildLinkProps } from '@solid-ui-components/ContentButtons'

const linkStyles = {
  display: `inline-block`,
  textDecoration: `none`,
  color: `inherit`
}

const ContentContainer = ({ content, children, ...props }) => {
  const { theme } = useThemeUI()
  const { setActiveModal } = useContext(ModalContext)
  const { setActiveTab } = useContext(TabsContext)

  let mergedProps = props
  let linkProps = {}

  if (content) {
    const { bg, link, ...contentRest } = content

    // Replace color variables in bg
    let bgWithVar = bg
    if (bgWithVar && typeof bgWithVar === 'string') {
      bgWithVar = bg.split(/\{{2}(.*?)\}{2}/gi)
      for (var i = 1; i < bgWithVar.length; i += 2) {
        bgWithVar[i] = theme.colors?.[bgWithVar[i]]
      }
      bgWithVar = bgWithVar.join('')
    }

    // Linking container
    if (link) {
      linkProps = buildLinkProps({
        content: link,
        setActiveModal,
        setActiveTab
      })?.linkProps
    }

    mergedProps = mergeWith(
      {},
      props,
      {
        ...contentRest,
        sx: { bg: bgWithVar, background: bgWithVar, ...(link && linkStyles) }
      },
      (a, b) => (b === null ? a : undefined)
    )
  }

  return (
    <Box {...mergedProps} {...linkProps}>
      {children}
    </Box>
  )
}

export default ContentContainer
