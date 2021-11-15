import common from './common'

export default {
  ...common.button,
  color: `alphaDark`,
  '::before': {
    display: `none`
  },
  '::after': {
    ...common.button['::after'],
    bg: `alphaLighter`,
    borderColor: `alphaLighter`
  }
}
