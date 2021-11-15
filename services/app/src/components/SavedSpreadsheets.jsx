import React, { useEffect, useState } from 'react'
import { Box, Typography, DialogContentText, Button } from '@mui/material'
import ConfirmationDialog from './ConfirmationDialog'
import { api, utils, useAuth, RoundButton } from '@tracktak/common'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import CollapsibleFolder from './CollapsibleFolder'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'

const SavedSpreadsheets = ({ onNewSpreadsheetClick, trackCustomEvent }) => {
  const navigate = useNavigate()
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const { userData, getAccessToken } = useAuth()
  const [selectedSpreadsheet, setSelectedSpreadsheet] = useState()
  const [folders, setFolders] = useState([])
  const [spreadsheets, setSpreadsheets] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessToken()
      const accessToken = token?.jwtToken

      const getSpreadsheetsMetadataPromise =
        api.getSpreadsheetsMetadata(accessToken)
      const getFoldersPromise = api.getFolders(accessToken)

      const dataResponse = await Promise.all([
        getSpreadsheetsMetadataPromise,
        getFoldersPromise
      ])

      const spreadsheets = dataResponse[0].data.spreadsheets
      const folders = dataResponse[1].data.folders

      const foldersWithSpreadsheets = folders.map(folder => {
        const spreadsheetsInFolder = spreadsheets.filter(({ _id }) =>
          folder.spreadsheetIds.includes(_id)
        )
        return {
          name: folder.name,
          spreadsheets: spreadsheetsInFolder
        }
      })

      setSpreadsheets(spreadsheets)
      setFolders(foldersWithSpreadsheets)
    }
    fetchData()
  }, [getAccessToken])

  const handleRowClick = spreadsheet => {
    navigate(`/${userData.name}/my-spreadsheets/${spreadsheet._id}`)
    // trackCustomEvent({
    //   category: 'Valuation',
    //   action: 'Modify',
    //   label: `Modified ${spreadsheet.sheetData.name}`,
    //   value: dayjs().format(utils.trackingFormatDate)
    // })
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
            onClick={onNewSpreadsheetClick}
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
      <Button
        sx={{
          textTransform: 'none'
        }}
        startIcon={<CreateNewFolderIcon />}
      >
        New Folder
      </Button>
      {spreadsheets?.length > 0 && (
        <>
          <Box
            sx={{
              marginTop: '20px',
              '& .MuiTableRow-root': {
                cursor: 'pointer'
              }
            }}
          >
            {folders.map(folder => {
              return (
                <CollapsibleFolder
                  folder={folder}
                  handleRowClick={handleRowClick}
                  handleDelete={handleDelete}
                  key={folder._id}
                />
              )
            })}
          </Box>
        </>
      )}
    </>
  )
}

export default SavedSpreadsheets
