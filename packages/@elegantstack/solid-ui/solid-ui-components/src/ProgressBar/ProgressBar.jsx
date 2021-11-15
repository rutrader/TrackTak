import React from 'react'
import Reveal from '@solid-ui-components/Reveal'
import { Box, css } from 'theme-ui'

const ProgressBar = ({ from, to, delay, duration, color, bg }) => (
  <Box
    sx={{
      width: `full`,
      height: `8px`,
      borderRadius: `full`,
      bg
    }}
  >
    <Reveal
      effect={null}
      transition={{
        type: 'spring',
        damping: 10,
        stiffness: 100,
        duration
      }}
      delay={delay}
      animate={{
        width: [
          parseFloat(from).toFixed(2) + '%',
          parseFloat(to).toFixed(2) + '%'
        ]
      }}
      css={css({
        height: `full`,
        borderRadius: `full`,
        bg: color
      })}
    />
  </Box>
)

export default ProgressBar

ProgressBar.defaultProps = {
  from: `20%`,
  to: `100%`,
  delay: 0,
  color: 'alpha',
  bg: 'omegaLight'
}
