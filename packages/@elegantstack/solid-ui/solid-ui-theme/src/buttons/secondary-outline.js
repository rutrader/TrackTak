import common from './common'

export default {
  ...common.button,
  color: `beta`,
  '::before': {
    display: `none`
  },
  '::after': {
    ...common.button['::after'],
    bg: `white`,
    borderColor: `beta`
  }
}
