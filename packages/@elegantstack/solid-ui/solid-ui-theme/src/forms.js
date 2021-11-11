export default {
  row: {
    display: [`block`, `block`, `flex`],
    flexWrap: `wrap`
  },
  full: {
    flex: `100%`,
    mb: [2, 3]
  },
  compact: {
    flex: `1`,
    mb: [2, 3],
    '&:first-of-type + &': {
      ml: [0, 0, 3]
    }
  },
  field: {
    display: `flex`,
    alignItems: `center`,
    bg: `omegaLighter`,
    borderRadius: `default`,
    width: `full`,
    p: 0
  },
  input: {
    fontFamily: `body`,
    border: `none`,
    bg: `omegaLighter`,
    color: `omegaDark`,
    outline: `none`,
    borderRadius: `default`,
    p: 3,
    '::placeholder': {
      color: `omegaDark`
    }
  },
  textarea: {
    variant: 'forms.input',
    minHeight: 100
  },
  label: {
    mb: 2,
    userSelect: `none`
  }
}
