import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import SearchTicker from './SearchTicker'

const SearchTickerDialog = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='form-dialog-title'
      PaperProps={{
        style: {
          padding: '25px',
          marginTop: '-40vh'
        }
      }}
    >
      <DialogTitle id='form-dialog-title'>
        Search for the company that you want to value.
      </DialogTitle>
      <DialogContent>
        <SearchTicker />
      </DialogContent>
    </Dialog>
  )
}

export default SearchTickerDialog
