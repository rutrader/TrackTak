/**
 *
 * These styles are solely for adding [background images] or
 * [background colors] to blocks.
 *
 */

import heroBg from './assets/dot-pattern.svg'
import growth from './assets/growth.svg'

export default {
  heroContainer: {
    bg: `#F6F7FA`,
    pt: [5, 6]
  },
  buildBrandContainer: {
    position: `relative`,
    '::before': {
      content: `" "`,
      size: `full`,
      position: `absolute`,
      right: 0,
      top: `13%`,
      zIndex: -1,
      background: `url(${heroBg}) no-repeat center center`,
      opacity: 0.3,
      backgroundSize: `40%`
    }
  },
  getStartedContainer: {
    position: `relative`,
    '::before': {
      content: `" "`,
      size: `full`,
      position: `absolute`,
      top: [`25%`, 0],
      right: 6,
      zIndex: -1,
      background: `url(${growth}) no-repeat right 0`,
      backgroundSize: `55%`
    }
  }
}
