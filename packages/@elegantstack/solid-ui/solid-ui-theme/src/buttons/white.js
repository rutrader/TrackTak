import common from './common'

export default {
  ...common.button,
  color: `alpha`,
  '::before': {
    ...common.button['::before'],
    bg: `alphaLighter`
  },
  '::after': {
    ...common.button['::after'],
    bg: `white`,
    borderColor: `white`
  }
}
