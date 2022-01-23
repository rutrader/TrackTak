import {
  Box,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  ListItemButton
} from '@mui/material'
import React, { useState, useEffect, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { utils, useAuth, api, SidePanel } from '@tracktak/common'
import { ProvideSpreadsheetsMetadata } from '../hooks/useSpreadsheetsMetadata'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import SidePanelTabFolders from './SidePanelTabFolders'
import { useNavigate, useParams } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [folders, setFolders] = useState([])
  const params = useParams()
  const [defaultFolderId, setDefaultFolderId] = useState()
  const { getAccessToken } = useAuth()
  const [currentEditableFolderId, setCurrentEditableFolderId] = useState(null)
  const deleteDisabled = folders.length === 1
  const folderId = params.folderId ?? defaultFolderId
  const currentFolder = folders.find(folder => folder._id === folderId)

  const fetchFolders = useCallback(async () => {
    const token = await getAccessToken()
    const accessToken = token?.jwtToken

    const { data } = await api.getFolders(accessToken)
    const folders = data.folders
    const defaultFolderId = folders[0]._id

    setDefaultFolderId(defaultFolderId)
    setFolders(folders)
  }, [getAccessToken, setDefaultFolderId, setFolders])

  const handleOnClickCreateNewFolder = async () => {
    const token = await getAccessToken()
    const accessToken = token?.jwtToken
    const res = await api.createFolder('New Folder', accessToken)
    const id = res.data.folder._id

    setCurrentEditableFolderId(id)

    await fetchFolders()
  }

  const handleClickDelete = async id => {
    const token = await getAccessToken()
    const accessToken = token?.jwtToken

    await api.deleteFolder(id, accessToken)
    await fetchFolders()
  }

  useEffect(() => {
    fetchFolders()
  }, [fetchFolders])

  return (
    <ProvideSpreadsheetsMetadata
      value={{
        defaultFolderId,
        folders
      }}
    >
      <Helmet>
        <title>{utils.getTitle('Dashboard')}</title>
      </Helmet>
      <SidePanel
        sidePanelTabs={
          <Box>
            {folders.map(({ _id, name }) => {
              return (
                <SidePanelTabFolders
                  key={_id}
                  id={_id}
                  folderName={name}
                  deleteDisabled={deleteDisabled}
                  folders={folders}
                  onDelete={handleClickDelete}
                  onClick={() => {
                    navigate(`/${_id}`)
                  }}
                  setCurrentEditableFolderId={setCurrentEditableFolderId}
                  currentEditableFolderId={currentEditableFolderId}
                  fetchFolders={fetchFolders}
                />
              )
            })}
            <Divider sx={{ my: 0.5 }} />
            <ListItem disablePadding>
              <ListItemButton
                sx={{ marginTop: '10px' }}
                onClick={handleOnClickCreateNewFolder}
              >
                <ListItemIcon>
                  <CreateNewFolderIcon />
                </ListItemIcon>
                <ListItemText primary='New Folder' />
              </ListItemButton>
            </ListItem>
          </Box>
        }
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Typography variant='h5' gutterBottom>
            {currentFolder?.name}
          </Typography>
        </Box>
        {folderId && <Outlet />}
      </SidePanel>
    </ProvideSpreadsheetsMetadata>
  )
}

export default Dashboard
