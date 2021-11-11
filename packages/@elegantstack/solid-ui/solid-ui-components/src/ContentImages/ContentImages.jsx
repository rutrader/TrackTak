import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'

const ImageComponent = ({ image, sx, ...props }) => {
  if (!image?.src) return null

  // SVG Asset
  const isSVG = image.src.extension === 'svg'
  if (isSVG) {
    return (
      <img
        src={image.src.publicURL}
        style={{
          width: image.width || `100%`,
          maxWidth: image.maxWidth || `none`
        }}
        {...props}
      />
    )
  }

  // Image Asset
  const imageData = getImage(image.src)
  if (imageData) {
    return (
      <GatsbyImage
        image={imageData}
        alt={image.alt}
        css={css({
          verticalAlign: `middle`,
          borderStyle: image.border ? `solid` : `none`,
          borderWidth: image.border || 0,
          borderColor: `white`,
          boxShadow: image.shadow || `unset`,
          borderRadius: image.radius || `unset`,
          ...sx
        })}
        {...props}
      />
    )
  }

  return null
}

const ContentImages = ({
  content: { images },
  reverse,
  imagePosition,
  objectPosition,
  imageFit,
  imageEffect,
  loading,
  sx
}) => {
  return images ? (
    <>
      <Reveal
        effect={imageEffect || (reverse ? 'fadeInRight' : 'fadeInLeft')}
        css={css({
          textAlign:
            imagePosition === 'center'
              ? 'center'
              : reverse
              ? `right`
              : undefined
        })}
      >
        <ImageComponent
          image={images[0]}
          loading={loading}
          objectFit={imageFit}
          objectPosition={objectPosition}
          sx={sx}
        />
      </Reveal>
      {images?.slice(1)?.map(
        (image, index) =>
          image.src && (
            <Reveal
              key={`item-${index}`}
              effect={image.effects[0] || undefined}
              delay={0.5}
              css={css({
                ...image.position,
                position: `absolute`,
                display: [`none`, `block`]
              })}
            >
              <Reveal
                effect={image.effects[1] || undefined}
                style={{ backfaceVisibility: `hidden` }}
              >
                <ImageComponent image={image} loading={loading} />
              </Reveal>
            </Reveal>
          )
      )}
    </>
  ) : null
}

ContentImages.defaultProps = {
  loading: 'lazy'
}

export default ContentImages
