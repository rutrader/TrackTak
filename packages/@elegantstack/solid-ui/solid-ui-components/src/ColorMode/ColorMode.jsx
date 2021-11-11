import React, { useState, useEffect, useContext } from 'react'
import { Box, useColorMode, useThemeUI } from 'theme-ui'
import pageContextProvider from '@helpers/pageContextProvider'
import { MdInvertColors } from 'react-icons/md'
import { FaChevronDown } from 'react-icons/fa'

const styles = {
  wrapper: {
    position: `fixed`,
    right: 0,
    bottom: `20%`,
    transform: `translate(40px, -56px)`,
    zIndex: 99
  },
  button: {
    borderRadius: `0.5rem 0 0 0.5rem`,
    boxShadow: `-1px 1px 5px 0 rgba(1,1,1,.05)`,
    bg: `white`,
    cursor: `pointer`,
    textTransform: `uppercase`,
    fontSize: 1,
    fontWeight: `bold`,
    p: 3,
    mb: 3,
    pr: 5,
    svg: {
      verticalAlign: `middle`,
      mr: 2
    },
    ':hover': {
      color: `#667eea`
    }
  },
  items: {
    transition: `all 0.2s ease-in`,
    bg: `contentBg`,
    overflow: `hidden`,
    boxSizing: `content-box`,
    boxShadow: `-1px 1px 5px 0 rgba(1,1,1,.05)`,
    borderRadius: `default`,
    textAlign: `center`,
    width: 130,
    maxHeight: 0,
    mb: 3,
    opacity: 0,
    open: {
      opacity: 1,
      pt: 3
    }
  },
  item: {
    display: `flex`,
    borderRadius: `default`,
    overflow: `hidden`,
    cursor: `pointer`,
    transition: `opacity 0.15s ease-in`,
    width: 100,
    height: 35,
    mx: `auto`,
    mb: 2,
    ':hover': {
      opacity: 0.9
    },
    div: {
      flexBasis: `1/4`
    }
  },
  close: {
    bg: `contentBg`,
    borderRadius: `full`,
    cursor: `pointer`,
    width: 24,
    mx: `auto`,
    svg: {}
  }
}

const ColorMode = () => {
  const [open, setOpen] = useState()
  const [colorMode, setColorMode] = useColorMode()
  const context = useThemeUI()
  const { pageContext } = useContext(pageContextProvider)

  const { modes } = context.theme.colors
  const modeNames = Object.keys(modes)

  const handleChange = color => setColorMode(color)
  const handleToggle = () => setOpen(state => !state)

  useEffect(() => {
    // Theme-UI saves last color mode in local storage. We don't want that.
    pageContext.colorMode === false &&
      localStorage.removeItem('theme-ui-color-mode')
  }, [])

  if (pageContext.colorMode === false) return null

  return (
    <Box sx={styles.wrapper}>
      <Box
        sx={{
          ...styles.items,
          ...(open && styles.items.open),
          ...(open && { maxHeight: modeNames.length * 40 + 50 })
        }}
      >
        {modeNames.map((mode, index) => (
          <Box
            key={`item-${index}`}
            sx={styles.item}
            title={mode}
            onClick={() => handleChange(mode)}
          >
            <Box bg={modes[mode].alphaLight}></Box>
            <Box bg={modes[mode].alpha}></Box>
            <Box bg={modes[mode].beta}></Box>
            <Box bg={modes[mode].betaLight}></Box>
          </Box>
        ))}
        <Box sx={styles.close} onClick={handleToggle}>
          <FaChevronDown size={20} />
        </Box>
      </Box>
      <Box sx={styles.button} onClick={handleToggle}>
        <MdInvertColors size={26} />
        <span>Colors</span>
      </Box>
    </Box>
  )
}

export default ColorMode
