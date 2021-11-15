import common from './common'

export default {
  ...common.button,
  color: `white`,
  backgroundImage: t => `linear-gradient(
    to right,
    ${t.colors.beta},
    ${t.colors.betaDark},
    ${t.colors.beta}
  )`,
  backgroundSize: `200% auto`,
  py: t => `calc(${t.space[2]} + ${t.borderWidths.md}px)`,
  ':hover': {
    backgroundPosition: `right center`
  }
}
