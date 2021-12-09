import React, { useState, useRef, useEffect } from 'react'
import {
  ListItemButton,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box
} from '@mui/material'
import Folder from '@mui/icons-material/Folder'
import OptionsMenuFolder from './OptionsMenuFolder'
import ContentEditable from 'react-contenteditable'
import { useAuth, api, utils } from '@tracktak/common'

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
  const editableRef = useRef()
  const textRef = useRef(folderName)
  const isInEditMode = currentEditableFolderId === id

  const handleOnChangeContentEditable = e => {
    textRef.current = e.target.value
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

  const handleBlur = async () => {
    const token = await getAccessToken()
    const accessToken = token?.jwtToken

    await api.updateFolder(id, textRef.current, accessToken)

    setCurrentEditableFolderId(null)

    await fetchFolders()
  }

  const handleClickDelete = async () => {
    setAnchorEl(null)

    onDelete(id)
  }

  useEffect(() => {
    if (editableRef.current && isInEditMode) {
      editableRef.current.focus()

      utils.setCaretToEndOfElement(editableRef.current)
    }
  }, [editableRef, isInEditMode])

  return (
    <ListItem disablePadding>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <ListItemButton onClick={onClick}>
          <ListItemIcon>
            <Folder />
          </ListItemIcon>
          <ListItemText
            sx={{
              maxWidth: 100,
              '& [contenteditable=true]:focus': {
                outline: '2px solid #43cea2',
                borderRadius: '2px'
              },
              '& [contenteditable=false]': {
                overflowWrap: 'break-word'
              }
            }}
            primary={
              <ContentEditable
                tabIndex={1}
                innerRef={editableRef}
                disabled={!isInEditMode}
                onBlur={handleBlur}
                onChange={handleOnChangeContentEditable}
                html={textRef.current}
              />
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
