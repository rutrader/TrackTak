import common from './common'

export default {
  ...common.button,
  color: `white`,
  backgroundImage: t => `linear-gradient(
    to right,
    ${t.colors.alpha},
    ${t.colors.alphaDark},
    ${t.colors.alpha}
  )`,
  backgroundSize: `200% auto`,
  py: t => `calc(${t.space[2]} + ${t.borderWidths.md}px)`,
  ':hover': {
    backgroundPosition: `right center`
  }
}
