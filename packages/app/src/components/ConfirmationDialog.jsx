import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const ConfirmationDialog = ({
  children,
  open,
  onClose,
  onCancel,
  onConfirm,
  titleText,
  confirmText = 'Ok',
  cancelText
}) => {
  const handleSubmit = e => {
    e.preventDefault()
    onConfirm()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='form-dialog-title'>
      {titleText && (
        <DialogTitle id='form-dialog-title'>{titleText}</DialogTitle>
      )}
      <DialogContent>{children}</DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          gap: 1,
          mb: 2
        }}
      >
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          {confirmText}
        </Button>
        <Button variant='outlined' onClick={onCancel} color='primary'>
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
