/**
 *
 * These styles are solely for adding [background images] or
 * [background colors] to blocks.
 *
 */

import holographic from './assets/holographic.jpg'

export default {
  heroContainer: {
    position: `relative`,
    py: [3],
    '::before, ::after': {
      position: `absolute`,
      content: `" "`,
      width: `full`,
      height: `85%`,
      top: [`25%`, null, null, `50%`],
      right: `50%`,
      transform: `translate(50%, -50%)`,
      zIndex: -1,
      borderRadius: `xl`
    },
    '::after': {
      background: `linear-gradient(
          180deg,
          rgba(255,255,255,0.2) 0%,
          rgba(255,255,255,0.9) 100%
        )`
    },
    '::before': {
      background: `url(${holographic}) no-repeat center center`,
      backgroundSize: `cover`
    }
  },
  featureOneContainer: {
    position: `relative`,
    py: [3],
    '::before, ::after': {
      position: `absolute`,
      content: `" "`,
      size: `70vw`,
      maxWidth: `500px`,
      maxHeight: `500px`,
      top: `50%`,
      left: `0%`,
      transform: [`translate(15vw, -185%)`, `translate(20%, -85%)`],
      zIndex: -2,
      borderRadius: `full`
    },
    '::after': {
      background: `linear-gradient(
          180deg,
          rgba(255,255,255,0.2) 0%,
          rgba(255,255,255,0.9) 100%
        )`
    },
    '::before': {
      background: `url(${holographic}) no-repeat center center`,
      backgroundSize: `cover`
    }
  },
  featureTwoContainer: {
    position: `relative`,
    py: [3],
    '::before, ::after': {
      position: `absolute`,
      content: `" "`,
      size: `70vw`,
      maxWidth: `500px`,
      maxHeight: `500px`,
      top: `50%`,
      right: `0%`,
      transform: [`translate(-15vw, 30%)`, `translate(-15%, -85%)`],
      zIndex: -2,
      borderRadius: `full`
    },
    '::after': {
      background: `linear-gradient(
          180deg,
          rgba(255,255,255,0.2) 0%,
          rgba(255,255,255,0.9) 100%
        )`
    },
    '::before': {
      background: `url(${holographic}) no-repeat center center`,
      backgroundSize: `cover`
    }
  },
  featureThreeContainer: {
    position: `relative`,
    py: [4],
    '::before, ::after': {
      position: `absolute`,
      content: `" "`,
      size: `full`,
      top: `30%`,
      right: `0%`,
      zIndex: -1
    },
    '::after': {
      background: `linear-gradient(
          180deg,
          rgba(255,255,255,1) 0%,
          rgba(255,255,255,0.6) 50%,
          rgba(255,255,255,1) 100%
        )`
    },
    '::before': {
      background: `url(${holographic}) no-repeat center center`,
      backgroundSize: `cover`
    }
  },
  whyChooseUsContainer: {
    bg: `omegaDarker`,
    borderRadius: `xl`,
    py: 5,
    px: [4, 0]
  }
}
