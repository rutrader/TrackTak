import common from './common'

export default {
  ...common.button,
  color: `betaDark`,
  '::before': {
    display: `none`
  },
  '::after': {
    ...common.button['::after'],
    bg: `betaLighter`,
    borderColor: `betaLighter`
  }
}
