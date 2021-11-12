import React from 'react'
import { Modal, Typography, Button, Box } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {
  const navigate = useNavigate()

  return (
    <Modal hideBackdrop open>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow:
            '0 50px 100px rgb(60 66 87 / 12%), 0 15px 35px rgb(60 66 87 / 12%), 0 5px 15px rgb(0 0 0 / 8%)',
          p: 4,
          '&:focus': {
            outline: 0,
            border: 0
          }
        }}
      >
        <CheckCircleOutlineIcon
          color='primary'
          fontSize='large'
          sx={{ mb: 2 }}
        />
        <Typography
          variant='h6'
          component='h2'
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          Payment success
        </Typography>
        <Typography sx={{ mt: 2, mb: 2 }}>
          Your payment was successful! You can now continue to the Dashboard
          page.
        </Typography>
        <Button
          onClick={() => {
            navigate('/dashboard')
          }}
          endIcon={<ArrowForwardIcon />}
          sx={{ textTransform: 'none' }}
          variant='contained'
        >
          Go to Dashboard
        </Button>
      </Box>
    </Modal>
  )
}

export default PaymentSuccess
