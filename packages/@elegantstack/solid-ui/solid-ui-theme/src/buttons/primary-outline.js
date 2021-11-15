import common from './common'

export default {
  ...common.button,
  color: `alpha`,
  '::before': {
    display: `none`
  },
  '::after': {
    ...common.button['::after'],
    bg: `white`,
    borderColor: `alpha`
  }
}
