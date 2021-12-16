import React, { useState, useRef, useEffect } from 'react'
import {
  ListItemButton,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  FormControl,
  Input
} from '@mui/material'
import Folder from '@mui/icons-material/Folder'
import OptionsMenuFolder from './OptionsMenuFolder'
import { useAuth, api } from '@tracktak/common'

const SidePanelTabFolders = ({
  id,
  folderName,
  onDelete,
  deleteDisabled,
  onClick,
  folders,
  setCurrentEditableFolderId,
  currentEditableFolderId,
  fetchFolders
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { getAccessToken } = useAuth()
  const open = Boolean(anchorEl)
  const inputRef = useRef()
  const [name, setName] = useState(folderName)
  const isInEditMode = currentEditableFolderId === id

  const handleOnChangeEditable = e => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleClickAnchor = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleAnchorClose = () => {
    setAnchorEl(null)
  }

  const handleClickEdit = () => {
    setCurrentEditableFolderId(id)
    setAnchorEl(null)
  }

  const updateFolderName = async () => {
    const token = await getAccessToken()
    const accessToken = token?.jwtToken

    await api.updateFolder(id, name, accessToken)

    setCurrentEditableFolderId(null)

    await fetchFolders()
  }

  const handleBlur = async () => {
    await updateFolderName()
  }

  const handleEditedTextOnEnter = async e => {
    if (e.key === 'Enter') {
      inputRef.current.blur()

      await updateFolderName()
    }
  }

  const handleClickDelete = async () => {
    setAnchorEl(null)

    onDelete(id)
  }

  useEffect(() => {
    // Has to be in useEffect due to re-render
    if (inputRef.current && isInEditMode) {
      inputRef.current.focus()
    }
  }, [isInEditMode, inputRef])

  return (
    <ListItem disablePadding>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <ListItemButton onClick={onClick}>
          <ListItemIcon>
            <Folder />
          </ListItemIcon>
          <ListItemText
            sx={{
              maxWidth: 100
            }}
            primary={
              <>
                {!isInEditMode ? (
                  <Box sx={{ overflow: 'hidden' }}>{name}</Box>
                ) : (
                  <FormControl focused={isInEditMode}>
                    <Input
                      inputRef={inputRef}
                      disableUnderline={!isInEditMode}
                      defaultValue={name}
                      tabIndex={1}
                      onBlur={handleBlur}
                      onChange={handleOnChangeEditable}
                      onKeyDown={handleEditedTextOnEnter}
                    />
                  </FormControl>
                )}
              </>
            }
          />
        </ListItemButton>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <OptionsMenuFolder
            handleClickAnchor={handleClickAnchor}
            handleAnchorClose={handleAnchorClose}
            handleClickEdit={handleClickEdit}
            handleClickDelete={handleClickDelete}
            deleteDisabled={deleteDisabled}
            folders={folders}
            open={open}
            anchorEl={anchorEl}
          />
        </Box>
      </Box>
    </ListItem>
  )
}

export default SidePanelTabFolders
