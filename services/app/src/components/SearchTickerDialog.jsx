import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import SearchTicker from './SearchTicker'
import { freeCashFlowFirmSimple } from '@tracktak/financial-model'

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
        <SearchTicker template={freeCashFlowFirmSimple} />
      </DialogContent>
    </Dialog>
  )
}

export default SearchTickerDialog
