import colors from './color-preset'

//Primary
const alpha = {
  alphaLighter: colors.indigo[100],
  alphaLight: colors.indigo[300],
  alpha: colors.indigo[500],
  alphaDark: colors.indigo[600],
  alphaDarker: colors.indigo[800]
}

// Secondary
const beta = {
  betaLighter: colors.purple[100],
  betaLight: colors.purple[300],
  beta: colors.purple[500],
  betaDark: colors.purple[600],
  betaDarker: colors.purple[800]
}

// Reserved
const gamma = {}

// Reserved
const psi = {}

// Neutral
const omega = {
  omegaLighter: colors.blueGray[200],
  omegaLight: colors.blueGray[300],
  omega: colors.blueGray[500],
  omegaDark: colors.blueGray[600],
  omegaDarker: colors.blueGray[800]
}

export default {
  text: colors.blueGray[600],
  article: colors.blueGray[700],
  heading: colors.blueGray[800],

  ...alpha,
  ...beta,
  ...gamma,
  ...psi,
  ...omega,

  successLight: colors.green[100],
  success: colors.green[500],
  errorLight: colors.red[100],
  error: colors.red[500],

  white: colors.white,
  background: `#f8f8f8`,
  contentBg: colors.white,
  headerBg: `transparent`,
  headerActiveBg: colors.white,
  headerActiveColor: omega.omegaDarker,
  footerBg: colors.white,

  mute: colors.blueGray[300],
  highlight: colors.blueGray[200],

  modes: {
    orangeRose: {
      // Alpha (primary)
      alphaLighter: colors.orange[100],
      alphaLight: colors.orange[300],
      alpha: colors.orange[500],
      alphaDark: colors.orange[600],
      alphaDarker: colors.orange[800],
      // beta (secondary)
      betaLighter: colors.rose[100],
      betaLight: colors.rose[300],
      beta: colors.rose[500],
      betaDark: colors.rose[600],
      betaDarker: colors.rose[800]
    },
    greenBlue: {
      // Alpha (primary)
      alphaLighter: colors.blue[100],
      alphaLight: colors.blue[300],
      alpha: colors.blue[500],
      alphaDark: colors.blue[600],
      alphaDarker: colors.blue[800],
      // beta (secondary)
      betaLighter: colors.lime[100],
      betaLight: colors.lime[300],
      beta: colors.lime[500],
      betaDark: colors.lime[700],
      betaDarker: colors.lime[800]
    },
    orangeBlue: {
      // Alpha (primary)
      alphaLighter: colors.blue[100],
      alphaLight: colors.blue[300],
      alpha: colors.blue[500],
      alphaDark: colors.blue[600],
      alphaDarker: colors.blue[800],
      // beta (secondary)
      betaLighter: colors.orange[100],
      betaLight: colors.orange[300],
      beta: colors.orange[500],
      betaDark: colors.orange[600],
      betaDarker: colors.orange[800]
    },
    blueBlack: {
      // Alpha (primary)
      alphaLighter: colors.blueGray[200],
      alphaLight: colors.blueGray[300],
      alpha: colors.blueGray[700],
      alphaDark: colors.blueGray[800],
      alphaDarker: colors.blueGray[900],
      // beta (secondary)
      betaLighter: colors.lightBlue[100],
      betaLight: colors.lightBlue[300],
      beta: colors.lightBlue[400],
      betaDark: colors.lightBlue[600],
      betaDarker: colors.lightBlue[800]
    },
    greenViolet: {
      // Alpha (primary)
      alphaLighter: colors.violet[100],
      alphaLight: colors.violet[300],
      alpha: colors.violet[500],
      alphaDark: colors.violet[600],
      alphaDarker: colors.violet[800],
      // beta (secondary)
      betaLighter: colors.green[100],
      betaLight: colors.green[300],
      beta: colors.green[500],
      betaDark: colors.green[600],
      betaDarker: colors.green[800]
    },
    purpleIndigo: {
      // Alpha (primary)
      alphaLighter: colors.indigo[100],
      alphaLight: colors.indigo[300],
      alpha: colors.indigo[500],
      alphaDark: colors.indigo[600],
      alphaDarker: colors.indigo[800],
      // beta (secondary)
      betaLighter: colors.purple[100],
      betaLight: colors.purple[300],
      beta: colors.purple[500],
      betaDark: colors.purple[600],
      betaDarker: colors.purple[800]
    },
    redBlue: {
      // Alpha (primary)
      alphaLighter: colors.blue[100],
      alphaLight: colors.blue[300],
      alpha: colors.blue[500],
      alphaDark: colors.blue[600],
      alphaDarker: colors.blue[800],
      // beta (secondary)
      betaLighter: colors.red[100],
      betaLight: colors.red[300],
      beta: colors.red[600],
      betaDark: colors.red[700],
      betaDarker: colors.red[800]
    }
  }
}
