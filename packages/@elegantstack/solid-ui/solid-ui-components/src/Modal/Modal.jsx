import React, { useContext } from 'react'
import ReactModal from 'react-modal'
import { IconButton, css } from 'theme-ui'
import { FaTimes } from 'react-icons/fa'
import { ModalContext } from '@solid-ui-components/Modal'
import './styles.css'

const styles = {
  modalContent: {
    borderRadius: `lg`,
    bg: `contentBg`,
    maxWidth: `container`,
    overflow: `hidden`,
    py: 5,
    px: 4
  },
  close: {
    position: `absolute`,
    top: [3, null, -5],
    left: [2, null, null, -5],
    size: [`icon.sm`, null, `icon.md`],
    zIndex: 99,
    svg: {
      size: [`icon.sm`, null, `icon.md`]
    },
    ':hover': {
      color: `omegaLighter`
    }
  }
}

ReactModal.setAppElement('#___gatsby')

const Modal = ({ children, id, contentStyles, ...props }) => {
  const { activeModal, setActiveModal } = useContext(ModalContext)

  return (
    <>
      <ReactModal
        id={id}
        isOpen={activeModal === id}
        closeTimeoutMS={300}
        onRequestClose={() => setActiveModal(null)}
        className='ModalPortalContent'
        overlayClassName='ModalPortalOverlay'
        shouldFocusAfterRender={false}
        css={css({ ...styles.modalContent, ...contentStyles })}
        {...props}
      >
        <IconButton
          onClick={() => setActiveModal(null)}
          sx={styles.close}
          aria-label='Close Modal'
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        >
          <FaTimes />
        </IconButton>
        {children}
      </ReactModal>
    </>
  )
}

export default Modal
