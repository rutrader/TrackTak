import React, { useState } from 'react'
import { Modal, Typography, Button, Box, Stack } from '@mui/material'

const FolderModal = ({
  openModal,
  disabledModal,
  handleClickMoveTo,
  folderItems
}) => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <Modal open={openModal} onClose={handleOnClickCloseModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          borderRadius: '8px',
          p: 4,
          '&:focus': {
            outline: 0,
            border: 0
          }
        }}
      >
        <Typography
          variant='h6'
          component='h2'
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          Move your spreadsheet between folders...
        </Typography>
        <Box sx={{ mt: 2, mb: 2 }}>{folderItems}</Box>
        <Stack direction='row' spacing={2}>
          <Button
            onClick={handleOnClickCloseModal}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleClickMoveTo}
            variant='contained'
            sx={{ textTransform: 'none' }}
          >
            Move
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default FolderModal
