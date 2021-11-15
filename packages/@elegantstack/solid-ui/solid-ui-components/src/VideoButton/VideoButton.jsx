import React, { useContext } from 'react'
import { Box, Button, Text } from 'theme-ui'
import { FaPlay } from 'react-icons/fa'
import Modal, { ModalContext } from '@solid-ui-components/Modal'

const styles = {
  buttonWrapper: {
    display: `inline-flex`,
    alignItems: `center`
  },
  button: {
    minWidth: `auto`,
    borderWidth: `sm`,
    borderRadius: `full`,
    p: 3,
    mr: 3,
    svg: {
      transform: `translate(10%, 0)`
    }
  },
  modal: {
    width: [`100%`, `75%`],
    maxWidth: `none`,
    bg: `#000`,
    px: 0,
    pb: 0,
    pt: [`56%`, `42.15%`]
  },
  iframe: {
    position: `absolute`,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: `100%`,
    height: `100%`
  }
}

const VideoButton = ({ variant, children, link }) => {
  const { setActiveModal } = useContext(ModalContext)
  const modalIdentifier = link

  return (
    <>
      <Modal
        id={modalIdentifier}
        contentLabel='Video'
        contentStyles={styles.modal}
      >
        <iframe
          style={styles.iframe}
          src={link}
          title='Video'
          frameBorder='0'
          allow={
            'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          }
          tabIndex='-1'
        />
      </Modal>
      <Box sx={styles.buttonWrapper}>
        <Button
          onClick={() => setActiveModal(modalIdentifier)}
          variant={variant}
          sx={styles.button}
          as='div'
          alt={children}
          title={children}
        >
          <FaPlay />
        </Button>
        <Text>{children}</Text>
      </Box>
    </>
  )
}

export default VideoButton
