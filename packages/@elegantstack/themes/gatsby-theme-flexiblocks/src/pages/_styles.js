export default {
  heroContainer: {
    position: `relative`,
    pt: 5,
    '::before': {
      content: `" "`,
      width: `110%`,
      height: `1310px`,
      position: `absolute`,
      top: `-200px`,
      zIndex: -1,
      borderRadius: `xl`,
      background: t => `radial-gradient(
          circle,
          ${t.colors.beta} 0%,
          ${t.colors.alpha} 100%
        )`,
      backgroundSize: `100%`,
      backgroundPosition: `650px bottom`
    }
  },
  featuresContainer: {
    position: `relative`,
    overflow: [`hidden`, `unset`],
    '::before': {
      content: `" "`,
      width: `100%`,
      height: [`80%`, null, `140%`],
      position: `absolute`,
      top: [`5%`, null, `-5%`],
      left: `60%`,
      zIndex: -1,
      borderRadius: `xl`,
      transform: `skew(23deg, 0deg) rotate(-10deg)`,
      background: t => `radial-gradient(
          circle,
          ${t.colors.beta} 0%,
          ${t.colors.alpha} 100%
        )`,
      backgroundSize: `100%`,
      backgroundPosition: `650px bottom`
    }
  },
  socialProofContainer: {
    position: `relative`,
    '::before': {
      content: `" "`,
      width: `100%`,
      height: `100%`,
      position: `absolute`,
      top: 0,
      left: 0,
      zIndex: -2,
      bg: `#F6F7FA`
    }
  }
}
