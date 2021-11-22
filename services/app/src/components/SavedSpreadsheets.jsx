import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  ListItemIcon,
  IconButton,
  DialogContentText,
  useTheme
} from '@mui/material'
import GridOnIcon from '@mui/icons-material/GridOn'
import DeleteIcon from '@mui/icons-material/Delete'
import ConfirmationDialog from './ConfirmationDialog'
import { api, useAuth } from '@tracktak/common'
import { useNavigate } from 'react-router-dom'
import logSpreadsheetEvent from '../shared/logSpreadsheetEvent'
import dayjs from 'dayjs'

const SavedSpreadsheets = ({ spreadsheets }) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const { userData, getAccessToken } = useAuth()
  const [selectedSpreadsheet, setSelectedSpreadsheet] = useState()

  const handleRowClick = spreadsheet => {
    navigate(`/${userData.name}/my-spreadsheets/${spreadsheet._id}`)

    logSpreadsheetEvent('Edit', spreadsheet.sheetData.name)
  }

  const handleDelete = spreadsheet => {
    setSelectedSpreadsheet(spreadsheet)
    setShowConfirmationDialog(true)
  }

  const handleDeleteConfirm = async () => {
    if (selectedSpreadsheet) {
      const token = await getAccessToken()
      const response = await api.deleteSpreadsheet(
        selectedSpreadsheet._id,
        token?.jwtToken
      )
      if (response.status === 200) {
        const updatedSpreadsheets = spreadsheets.filter(
          spreadsheet => spreadsheet._id !== selectedSpreadsheet._id
        )
        setSpreadsheets(updatedSpreadsheets)
      }
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
                      sx={{
                        borderRadius: '2px',
                        color: theme.palette.alert
                      }}
                      onClick={e => {
                        e.stopPropagation()
                        handleDelete(spreadsheet)
                      }}
                      type='button'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default SavedSpreadsheets
