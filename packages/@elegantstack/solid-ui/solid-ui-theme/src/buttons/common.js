const button = {
  fontFamily: `body`,
  display: `inline-flex`,
  minWidth: `10rem`,
  alignItems: `center`,
  justifyContent: `space-evenly`,
  outline: 0,
  userSelect: `none`,
  WebkitTapHighlightColor: `transparent`,
  borderRadius: `xl`,
  cursor: `pointer`,
  whiteSpace: `pre`,
  transition: `all 250ms ease`,
  position: `relative`,
  zIndex: 0,
  px: 4,
  '::after, ::before': {
    content: `" "`,
    position: `absolute`,
    top: t => `-${t.borderWidths.md}`,
    left: t => `-${t.borderWidths.md}`,
    zIndex: -2,
    size: `100%`,
    borderRadius: `inherit`,
    borderWidth: `md`,
    borderStyle: `solid`,
    transitionDuration: `0.35s`
  },
  '::after': {
    zIndex: -2,
    transform: `perspective(1px) translateZ(0)`,
    transitionTimingFunction: `cubic-bezier(0.47, 2.02, 0.31, 0.1)`
  },
  '::before': {
    zIndex: -1,
    bg: `rgba(0,0,0,.05)`,
    borderColor: `transparent`,
    transform: `scale(0.5) perspective(15px)`,
    opacity: 0
  },
  ':hover': {
    '::after': {
      transform: `scale(1.08)`,
      transitionTimingFunction: `cubic-bezier(0.47, 2.02, 0.31, 0.1)`
    },
    '::before': {
      opacity: 1,
      transform: `scale(1.08) perspective(15px)`
    }
  },
  ':active': {
    '::after': {
      transform: `scale(1.02)`,
      transitionTimingFunction: `cubic-bezier(0.47, 2.02, 0.31, 0.1)`
    }
  }
}

export default {
  button
}
