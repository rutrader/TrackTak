import React, { useState, useRef, useEffect } from 'react'
import { ListItem, ListItemText, ListItemIcon } from '@mui/material'
import Folder from '@mui/icons-material/Folder'
import OptionsMenu from './OptionsMenu'
import ContentEditable from 'react-contenteditable'
import { setCaretToEndOfElement } from '../../../../packages/common/src/shared/utils'

const SidePanelTabFolders = ({ folderName }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const open = Boolean(anchorEl)
  const editableRef = useRef()
  const text = useRef('')

  const handleContentEditable = e => {
    text.current = e.target.value
  }

  const handleClickAnchor = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleAnchorClose = () => {
    setAnchorEl(null)
  }

  const handleClickEdit = () => {
    setDisabled(false)
    setAnchorEl(null)
  }

  const handleBlur = () => {
    //TODO: axios api call
    setDisabled(true)
  }

  const handleClickDelete = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (editableRef.current && !disabled) {
      editableRef.current.focus()

      setCaretToEndOfElement(editableRef.current)
    }
  }, [editableRef, disabled])

  return (
    <ListItem>
      <ListItemIcon>
        <Folder />
      </ListItemIcon>
      <ListItemText
        sx={{
          '& [contenteditable=true]:focus': {
            outline: '2px solid #43cea2',
            borderRadius: '2px'
          }
        }}
        primary={
          <ContentEditable
            tabIndex={1}
            innerRef={editableRef}
            disabled={disabled}
            onBlur={handleBlur}
            onChange={handleContentEditable}
            html={folderName}
          />
        }
      />
      <OptionsMenu
        handleClickAnchor={handleClickAnchor}
        handleAnchorClose={handleAnchorClose}
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
        open={open}
        anchorEl={anchorEl}
      />
    </ListItem>
  )
}

export default SidePanelTabFolders
