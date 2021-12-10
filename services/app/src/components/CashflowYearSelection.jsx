import {
  Dialog,
  DialogTitle,
  Slider,
  Button,
  DialogActions
} from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const projectionYears = value => {
  return `${value} years`
}

const marks = [
  {
    value: 5,
    label: projectionYears(5)
  },
  {
    value: 10,
    label: projectionYears(10)
  },
  {
    value: 15,
    label: projectionYears(15)
  }
]

const CashflowYearSelection = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          padding: '20px',
          display: 'flex',
          alignItems: 'center'
        }
      }}
    >
      <DialogTitle
        variant='h5'
        sx={{
          fontWeight: 'bold',
          color: 'black'
        }}
      >
        Choose your cashflow year-projection period.
      </DialogTitle>
      <Box
        sx={{
          width: 400,
          mt: '20px'
        }}
      >
        <Slider
          aria-label='Temperature'
          defaultValue={10}
          valueLabelDisplay='on'
          step={1}
          marks={marks}
          min={5}
          max={15}
          getAriaValueText={projectionYears}
        />
      </Box>
      <DialogActions sx={{ mt: '20px' }}>
        <Button
          autoFocus
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
          variant='contained'
        >
          Continue to Template
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CashflowYearSelection
