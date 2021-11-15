import { merge } from 'theme-ui'
import typography from './typography'
import borderWidths from './borderWidths'
import breakpoints from './breakpoints'
import space from './space'
import sizes from './sizes'
import radii from './radii'
import shadows from './shadows'
import colors from './colors'
import styles from './styles'
import buttons from './buttons'
import links from './links'
import text from './text'
import cards from './cards'
import badges from './badges'
import forms from './forms'
import layout from './layout'
import global from './global'

export default merge(typography, {
  colors,
  breakpoints,
  sizes,
  space,
  radii,
  shadows,
  borderWidths,
  styles,
  buttons,
  links,
  text,
  cards,
  badges,
  forms,
  layout,
  global
})
