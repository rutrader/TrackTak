import React from 'react'
import { Box } from 'theme-ui'

const FlexOverlapFade = ({ direction }) => (
  <Box
    sx={{
      display: [`none`, `block`, null, `none`],
      position: `absolute`,
      top: `-25%`,
      left: direction === 'ltr' ? '-50%' : '0',
      zIndex: 0,
      size: `150%`,
      backgroundImage: t =>
        `radial-gradient(
          circle,
          ${t.colors.background} 25%,
          transparent 70%
        )`
    }}
  />
)

export default FlexOverlapFade

FlexOverlapFade.defaultProps = {
  direction: 'ltr'
}
