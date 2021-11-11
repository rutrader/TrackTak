import React, { useState } from 'react'
import Modal from 'react-modal'
import { Box, IconButton } from 'theme-ui'
import { FaBars, FaTimes } from 'react-icons/fa'
import './styles.css'

const styles = {
  panelContent: {
    height: `100%`,
    zIndex: 2,
    bg: `contentBg`,
    overflowY: `scroll`,
    p: 3
  },
  openButton: {
    // display: ['', '', 'none'], //to avoid ssr rehydration issue
    verticalAlign: `middle`
  },
  closeButton: {
    position: `fixed`,
    zIndex: 99999,
    left: `-20%`,
    top: 4,
    color: `white`
  }
}

const Drawer = ({ children, buttonStyle }) => {
  const [open, setOpen] = useState()
  const handleClick = () => setOpen(!open)

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{ ...styles.openButton, ...buttonStyle }}
        aria-label='Open Drawer'
      >
        <FaBars />
      </IconButton>
      <Modal
        isOpen={open}
        onRequestClose={handleClick}
        closeTimeoutMS={300}
        contentLabel='Drawer'
        className='DrawerPortalContent'
        overlayClassName='DrawerPortalOverlay'
      >
        <Box sx={styles.panelContent}>{children}</Box>
        <IconButton
          onClick={handleClick}
          sx={{ ...styles.closeButton, ...buttonStyle }}
          aria-label='Close Drawer'
        >
          <FaTimes />
        </IconButton>
      </Modal>
    </>
  )
}

export default Drawer
