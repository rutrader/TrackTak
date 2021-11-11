/**
 *
 * These styles are solely for adding [background images] or
 * [background colors] to blocks.
 *
 */

import sprinkle from './assets/sprinkle-pattern.svg'

export default {
  heroContainer: {
    position: `relative`,
    pt: [6, 7],
    '::before, ::after': {
      position: `absolute`,
      content: `" "`,
      width: `full`,
      height: `3/5`,
      top: 0,
      right: 0
    },
    '::before': {
      zIndex: -3,
      bg: `white`,
      background: t => `linear-gradient(
        145deg,
        ${t.colors.alpha} 0%,
        ${t.colors.alphaDarker} 100%
      )`
    },
    '::after': {
      zIndex: -2,
      background: `url(${sprinkle}) repeat right top`,
      opacity: 0.3
    }
  },
  servicesContainer: {
    px: [3, 4]
  }
}
