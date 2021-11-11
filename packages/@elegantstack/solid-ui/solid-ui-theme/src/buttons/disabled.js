import common from './common'

export default {
  ...common.button,
  cursor: `not-allowed`,
  color: `white`,
  '::after': {
    ...common.button['::after'],
    bg: `omega`,
    borderColor: `omega`
  }
}
