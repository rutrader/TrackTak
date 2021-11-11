export default {
  layout: {
    flexDirection: 'column',
    height: `100vh`
  },
  body: {
    flex: `1 1 auto`
  },

  /** Containers */
  container: {
    maxWidth: `container`,
    px: [3, 4]
  },
  narrow: {
    maxWidth: `narrow`,
    px: [3, 4]
  },
  wide: {
    maxWidth: `wide`,
    px: [3, 4]
  },
  full: {
    maxWidth: `none`
  },

  /** Sticky Box */
  sticky: {
    position: `sticky`,
    top: 4
  }
}
