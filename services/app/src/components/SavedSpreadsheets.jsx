import React, { useState, useEffect } from 'react'
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
  IconButton,
  useTheme
} from '@mui/material'
import ConfirmationDialog from './ConfirmationDialog'
import { api, useAuth, RoundButton } from '@tracktak/common'
import { useNavigate } from 'react-router-dom'
import logValuationEvent from '../shared/logValuationEvent'
import dayjs from 'dayjs'
import { useSpreadsheetsMetadata } from '../hooks/useSpreadsheetsMetadata'
import GridOnIcon from '@mui/icons-material/GridOn'
import DeleteIcon from '@mui/icons-material/Delete'

const SavedSpreadsheets = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { folderId, handleShowSearchTickerDialog } = useSpreadsheetsMetadata()
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const { userData, getAccessToken } = useAuth()
  const [selectedSpreadsheet, setSelectedSpreadsheet] = useState()
  const [spreadsheets, setSpreadsheets] = useState()

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessToken()
      const accessToken = token?.jwtToken
      const { data } = await api.getSpreadsheetsInFolder(folderId, accessToken)
      const spreadsheets = data.spreadsheets

      setSpreadsheets(spreadsheets)
    }
    fetchData()
  }, [getAccessToken, setSpreadsheets, folderId])

  const handleRowClick = spreadsheet => {
    navigate(`/${userData.name}/my-spreadsheets/${spreadsheet._id}`)

    logValuationEvent('Edit', spreadsheet.sheetData.name)
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
      )}
    </>
  )
}

export default SavedSpreadsheets
