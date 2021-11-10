import React from 'react'
import mergeWith from 'lodash.mergewith'
import { Text, Heading } from 'theme-ui'

const gradient = {
  background: t => `
    linear-gradient(
      125deg,
      ${t.colors.alpha} 32.5%,
      ${t.colors.alphaDarker} 50.5%)
  `,
  WebkitBackgroundClip: `text`,
  WebkitTextFillColor: `transparent`
}

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

const ContentText = ({ as: CustomComponent, content, children, ...props }) => {
  if (!content || content.length < 1) return null

  const contentArray = Array.isArray(content) ? content : [content]

  return contentArray.map(({ text, ...contentRest }, index) => {
    if (!text) return null

    contentRest.mb = contentRest.space

    const { variant, color, ...mergedProps } = mergeWith(
      {},
      props,
      contentRest,
      (a, b) => (b === null ? a : undefined)
    )

    const isHeading = headings.includes(variant)

    // Replace special colored parts in headings
    let textWithSpecial = null

    if (isHeading && !children) {
      textWithSpecial = text.split(/\*{2}(.*?)\*{2}/gi)
      for (var i = 1; i < textWithSpecial.length; i += 2) {
        textWithSpecial[i] = (
          <Text key={`item-${i}`} as='span' color='alpha'>
            {textWithSpecial[i]}
          </Text>
        )
      }
    }

    return isHeading ? (
      <Heading
        key={`item-${index}`}
        variant={variant}
        as={variant}
        color={color}
        sx={color === 'gradient' ? gradient : {}}
        {...mergedProps}
      >
        {children || textWithSpecial || text}
      </Heading>
    ) : (
      <Text
        key={`item-${index}`}
        variant={variant}
        color={color}
        {...mergedProps}
      >
        {children || text}
      </Text>
    )
  })
}

export default ContentText
