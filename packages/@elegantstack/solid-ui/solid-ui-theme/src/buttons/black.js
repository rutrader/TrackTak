import common from './common'

export default {
  ...common.button,
  color: `white`,
  '::after': {
    ...common.button['::after'],
    bg: `black`,
    borderColor: `black`
  }
}
