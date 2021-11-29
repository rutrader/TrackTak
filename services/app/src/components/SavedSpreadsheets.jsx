import React, { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Typography,
  DialogContentText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  ListItemIcon,
  useTheme,
  Modal,
  Button,
  MenuItem,
  Divider,
  IconButton
} from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DeleteIcon from '@mui/icons-material/Delete'
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove'
import FolderIcon from '@mui/icons-material/Folder'
import ConfirmationDialog from './ConfirmationDialog'
import { api, useAuth, RoundButton } from '@tracktak/common'
import { useNavigate } from 'react-router-dom'
import logValuationEvent from '../shared/logValuationEvent'
import dayjs from 'dayjs'
import { useSpreadsheetsMetadata } from '../hooks/useSpreadsheetsMetadata'
import GridOnIcon from '@mui/icons-material/GridOn'
import { StyledMenu } from './OptionsMenuFolder'

const SavedSpreadsheets = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { folderId, handleShowSearchTickerDialog, folders } =
    useSpreadsheetsMetadata()
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const { userData, getAccessToken } = useAuth()
  const [selectedSpreadsheet, setSelectedSpreadsheet] = useState()
  const [spreadsheets, setSpreadsheets] = useState()
  const [openModalFolder, setOpenModalFolder] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const foldersLength = folders.length === 1 ? true : false

  const fetchNewSpreadsheets = useCallback(async () => {
    const token = await getAccessToken()
    const accessToken = token?.jwtToken
    const { data } = await api.getSpreadsheetsInFolder(folderId, accessToken)
    const spreadsheets = data.spreadsheets

    setSpreadsheets(spreadsheets)
  }, [getAccessToken, setSpreadsheets, folderId])

  useEffect(() => {
    fetchNewSpreadsheets()
  }, [fetchNewSpreadsheets])

  const handleRowClick = spreadsheet => {
    navigate(`/${userData.name}/my-spreadsheets/${spreadsheet._id}`)

    logValuationEvent('Edit', spreadsheet.sheetData.name)
  }

  const handleOnClickDelete = () => {
    setShowConfirmationDialog(true)
  }

  const handleOnClickAnchor = spreadsheet => e => {
    e.stopPropagation()

    setSelectedSpreadsheet(spreadsheet)
    setAnchorEl(e.currentTarget)
  }

  const handleOnClickAnchorClose = () => {
    setAnchorEl(null)
  }

  const handleOnClickCloseModal = () => {
    setOpenModalFolder(false)
  }

  const handleOnClickOpenModal = () => {
    setOpenModalFolder(true)
    setAnchorEl(null)
  }

  const handleOnClickMoveSpreadsheetTo = async folderId => {
    const token = await getAccessToken()
    const accessToken = token?.jwtToken

    await api.updateSpreadsheetFolder(spreadsheet._id, folderId, accessToken)
    await fetchNewSpreadsheets()
  }

  const handleDeleteConfirm = async () => {
    if (selectedSpreadsheet) {
      const token = await getAccessToken()

      await api.deleteSpreadsheet(selectedSpreadsheet._id, token?.jwtToken)
      await fetchNewSpreadsheets()
    }
  }

  const handleConfirmationDialogClose = () => {
    setShowConfirmationDialog(false)
  }

  const cellHeaderStyle = {
    fontSize: theme.typography.table.header,
    fontWeight: 'bold'
  }

  return (
    <>
      <ConfirmationDialog
        open={showConfirmationDialog}
        onClose={handleConfirmationDialogClose}
        onCancel={handleConfirmationDialogClose}
        onConfirm={handleDeleteConfirm}
        confirmText='Delete'
        cancelText='Cancel'
        titleText='Confirm'
      >
        <DialogContentText
          sx={{
            color: 'black'
          }}
        >
          Are you sure you want to delete this valuation?
        </DialogContentText>
      </ConfirmationDialog>
      {/* No falsy check because null means the data hasn't loaded yet */}
      {spreadsheets?.length === 0 && (
        <Box
          sx={{
            marginTop: theme => theme.spacing(10)
          }}
          textAlign={'center'}
        >
          <Typography gutterBottom variant='h5'>
            Start by creating your first valuation!
          </Typography>
          <RoundButton
            variant='contained'
            color='primary'
            onClick={handleShowSearchTickerDialog}
            type='button'
            sx={{
              mt: 2,
              textTransform: 'none'
            }}
          >
            Create Valuation
          </RoundButton>
        </Box>
      )}
      {spreadsheets?.length > 0 && (
        <>
          <TableContainer
            sx={{
              marginTop: '20px',
              '& .MuiTableRow-root': {
                cursor: 'pointer'
              }
            }}
          >
            <Table aria-label='spreadsheet table'>
              <TableHead>
                <TableRow>
                  <TableCell style={cellHeaderStyle}>Name</TableCell>
                  <TableCell style={cellHeaderStyle} align='right'>
                    Last Modified
                  </TableCell>
                  <TableCell style={cellHeaderStyle} align='right' />
                </TableRow>
              </TableHead>
              <TableBody>
                {spreadsheets
                  .sort(
                    (a, b) =>
                      new Date(b.lastModifiedTimestamp) -
                      new Date(a.lastModifiedTimestamp)
                  )
                  .map(spreadsheet => (
                    <TableRow
                      key={spreadsheet._id}
                      hover
                      onClick={() => handleRowClick(spreadsheet)}
                    >
                      <TableCell component='th' scope='row'>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <ListItemIcon>
                            <GridOnIcon />
                          </ListItemIcon>
                          {spreadsheet.sheetData.name}
                        </Box>
                      </TableCell>
                      <TableCell align='right'>
                        {dayjs(spreadsheet.lastModifiedTimestamp).format(
                          'DD MMM YY HH:mm'
                        )}
                      </TableCell>
                      <TableCell align='right'>
                        <IconButton
                          color='primary'
                          aria-haspopup='true'
                          aria-expanded={open ? 'true' : undefined}
                          variant='contained'
                          onClick={handleOnClickAnchor(spreadsheet)}
                        >
                          <MoreHorizIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <StyledMenu
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button'
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleOnClickAnchorClose}
          >
            <MenuItem
              disableRipple
              disabled={foldersLength}
              onClick={handleOnClickAnchorClose}
              onClick={handleOnClickOpenModal}
            >
              <DriveFileMoveIcon />
              Move to
            </MenuItem>
            <MenuItem
              disableRipple
              onClick={handleOnClickAnchorClose}
              onClick={handleOnClickDelete}
            >
              <DeleteIcon />
              Delete
            </MenuItem>
          </StyledMenu>
          <Modal open={openModalFolder} onClose={handleOnClickCloseModal}>
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
                      onClick={() => handleOnClickMoveSpreadsheetTo(folder._id)}
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
      )}
    </>
  )
}

export default SavedSpreadsheets
