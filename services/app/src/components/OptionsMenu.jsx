import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import {
  Modal,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Divider
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove'
import FolderIcon from '@mui/icons-material/Folder'

const StyledMenu = styled(props => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        )
      }
    }
  }
}))

const OptionsMenu = ({
  open,
  anchorEl,
  handleClickAnchor,
  handleAnchorClose,
  handleClickEdit,
  handleClickDelete,
  disabledMenuitem,
  disabledModal,
  handleOnClickOpenModal,
  handleOnClickCloseModal,
  openModal,
  folders
}) => {
  return (
    <>
      <IconButton
        color='primary'
        aria-controls='demo-customized-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='contained'
        onClick={handleClickAnchor}
      >
        <MoreHorizIcon />
      </IconButton>
      <StyledMenu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleAnchorClose}
      >
        <MenuItem
          onClick={handleOnClickOpenModal}
          disabled={disabledModal}
          disableRipple
        >
          <DriveFileMoveIcon />
          Move to
        </MenuItem>
        <MenuItem onClick={handleClickEdit} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem
          onClick={handleClickDelete}
          disableRipple
          disabled={disabledMenuitem}
        >
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu>
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
            Move my spreadsheet to...
          </Typography>
          <Divider />
          <Box sx={{ mt: 2 }}>
            {folders.map(folder => {
              return (
                <Button
                  fullWidth
                  key={folder._id}
                  startIcon={<FolderIcon sx={{ color: '#707070' }} />}
                  sx={{
                    textTransform: 'none',
                    color: '#1A1A1A',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    padding: '15px',
                    ':hover': {
                      color: theme => theme.palette.primary.main
                    }
                  }}
                >
                  {folder.name}
                </Button>
              )
            })}
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default OptionsMenu
