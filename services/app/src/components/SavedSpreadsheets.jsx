import React, { useState, useEffect, useCallback, useRef } from 'react'
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
  useTheme,
  Modal,
  Button,
  MenuItem,
  Divider,
  IconButton,
  ListItemIcon,
  FormControl,
  Input
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove'
import FolderIcon from '@mui/icons-material/Folder'
import ConfirmationDialog from './ConfirmationDialog'
import { api, useAuth } from '@tracktak/common'
import { useNavigate } from 'react-router-dom'
import logSpreadsheetEvent from '../shared/logSpreadsheetEvent'
import { useSpreadsheetsMetadata } from '../hooks/useSpreadsheetsMetadata'
import { StyledMenu } from './OptionsMenuFolder'
import Templates from './Templates'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import GridOnIcon from '@mui/icons-material/GridOn'
import dayjs from 'dayjs'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const SavedSpreadsheets = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { folderId, folders } = useSpreadsheetsMetadata()
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const { userData, getAccessToken } = useAuth()
  const [selectedSpreadsheet, setSelectedSpreadsheet] = useState()
  const [spreadsheets, setSpreadsheets] = useState([])
  const [name, setName] = useState()
  const [openModalFolder, setOpenModalFolder] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const inputRef = useRef()
  const [currentEditableSpreadsheetId, setCurrentEditableSpreadsheetId] =
    useState(null)
  const open = Boolean(anchorEl)
  const moveToDisabled = folders.length === 1
  const isSelectedInEditMode =
    currentEditableSpreadsheetId === selectedSpreadsheet?._id

  const fetchNewSpreadsheets = useCallback(async () => {
    const token = await getAccessToken()
    const accessToken = token?.jwtToken
    const { data } = await api.getSpreadsheetsInFolder(folderId, accessToken)
    const spreadsheets = data.spreadsheets

    setSpreadsheets(spreadsheets)
  }, [getAccessToken, setSpreadsheets, folderId])

  const updateSpreadsheetName = async spreadsheet => {
    const token = await getAccessToken()
    const accessToken = token?.jwtToken

    await api.saveSpreadsheet(
      {
        ...spreadsheet,
        sheetData: {
          ...spreadsheet.sheetData,
          name
        }
      },
      accessToken
    )
    await fetchNewSpreadsheets()

    setCurrentEditableSpreadsheetId(null)
  }

  const handleOnChangeEditable = e => {
    e.preventDefault()

    setName(e.target.value)
  }

  const handleOnBlurSpreadsheet = spreadsheet => async () => {
    await updateSpreadsheetName(spreadsheet)
  }

  const handleEditedTextOnEnter = spreadsheet => async e => {
    if (e.key === 'Enter') {
      inputRef.current.blur()

      await updateSpreadsheetName(spreadsheet)
    }
  }

  const goToSpreadsheet = spreadsheet => {
    navigate(`/${userData.name}/my-spreadsheets/${spreadsheet._id}`)

    logSpreadsheetEvent('Edit', spreadsheet.sheetData.name)
  }

  const handleOnClickDelete = () => {
    setShowConfirmationDialog(true)
  }

  const handleClickEditSpreadsheet = () => {
    setCurrentEditableSpreadsheetId(selectedSpreadsheet._id)
    setAnchorEl(null)
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
    if (selectedSpreadsheet) {
      const token = await getAccessToken()
      const accessToken = token?.jwtToken

      await api.updateSpreadsheetFolder(
        selectedSpreadsheet._id,
        folderId,
        accessToken
      )
      await fetchNewSpreadsheets()

      setOpenModalFolder(false)
      navigate(`/${folderId}`)
    }
  }

  const handleDeleteConfirm = async () => {
    if (selectedSpreadsheet) {
      const token = await getAccessToken()

      await api.deleteSpreadsheet(selectedSpreadsheet._id, token?.jwtToken)
      await fetchNewSpreadsheets()

      setAnchorEl(null)
    }
  }

  const handleConfirmationDialogClose = () => {
    setShowConfirmationDialog(false)
  }

  const cellHeaderStyle = {
    fontSize: theme.typography.table.header,
    fontWeight: 'bold'
  }

  useEffect(() => {
    // Has to be in useEffect due to re-render
    if (inputRef.current && isSelectedInEditMode) {
      inputRef.current.focus()
    }
  }, [isSelectedInEditMode, inputRef])

  useEffect(() => {
    fetchNewSpreadsheets()
  }, [fetchNewSpreadsheets])

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
      {spreadsheets.length ? (
        <>
          <IconButton
            component={Link}
            to='/templates'
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              padding: 0,
              backgroundColor: theme => theme.palette.primary.light,
              width: '40px',
              height: '40px',
              '&:hover': {
                backgroundColor: theme => theme.palette.primary.dark
              }
            }}
          >
            <AddIcon style={{ color: 'white' }} fontSize='large' />
          </IconButton>
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
                  .map(spreadsheet => {
                    const isInEditMode =
                      currentEditableSpreadsheetId === spreadsheet?._id
                    return (
                      <TableRow
                        key={spreadsheet._id}
                        hover
                        onClick={() => {
                          if (!isInEditMode) {
                            goToSpreadsheet(spreadsheet)
                          }
                        }}
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
                            {isInEditMode ? (
                              <FormControl focused={isInEditMode}>
                                <Input
                                  inputRef={inputRef}
                                  defaultValue={spreadsheet.sheetData.name}
                                  onChange={handleOnChangeEditable}
                                  onBlur={handleOnBlurSpreadsheet(spreadsheet)}
                                  onKeyDown={handleEditedTextOnEnter(
                                    spreadsheet
                                  )}
                                />
                              </FormControl>
                            ) : (
                              <Box sx={{ overflow: 'hidden' }}>
                                {spreadsheet.sheetData.name}
                              </Box>
                            )}
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
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <StyledMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleOnClickAnchorClose}
          >
            <MenuItem
              disableRipple
              disabled={moveToDisabled}
              onClick={handleOnClickOpenModal}
            >
              <DriveFileMoveIcon />
              Move to
            </MenuItem>
            <MenuItem disableRipple onClick={handleClickEditSpreadsheet}>
              <EditIcon />
              Edit
            </MenuItem>
            <MenuItem disableRipple onClick={handleOnClickDelete}>
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
                maxHeight: 500,
                bgcolor: 'background.paper',
                borderRadius: '8px',
                overflow: 'auto',
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
                {folders
                  .filter(({ _id }) => {
                    return _id !== folderId
                  })
                  .map(folder => {
                    return (
                      <Button
                        fullWidth
                        key={folder._id}
                        startIcon={<FolderIcon sx={{ color: '#707070' }} />}
                        onClick={() =>
                          handleOnClickMoveSpreadsheetTo(folder._id)
                        }
                        sx={{
                          textTransform: 'none',
                          color: theme.palette.folderNameText,
                          display: 'flex',
                          justifyContent: 'flex-start',
                          padding: '15px',
                          ':hover': {
                            color: theme.palette.primary.main
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
      ) : (
        <Templates />
      )}
    </>
  )
}

export default SavedSpreadsheets
