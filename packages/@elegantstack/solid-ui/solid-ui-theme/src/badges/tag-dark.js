import common from './common'

export default {
  ...common.badge,
  bg: `omegaDark`,
  color: `white`,
  ':hover': {
    bg: `alpha`,
    color: `white`
  }
}
