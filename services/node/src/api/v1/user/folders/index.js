import express from 'express'
import {
  getFolders,
  getFolder,
  createFolder,
  updateFolder,
  deleteFolder
} from './foldersApi'

const router = express.Router()

router.get('/', async (req, res) => {
  const folders = await getFolders(req.user.username)

  if (folders.length === 0) {
    const folder = await createFolder('Valuations', req.user.username)

    res.send({ folders: [folder] })

    return
  }

  res.send({ folders })
})

router.get('/:id', async (req, res) => {
  const folder = await getFolder(req.params.id)

  res.send({ folder })
})

router.post('/', async (req, res) => {
  const folder = await createFolder(req.body.name, req.user.username)

  res.send({ folder })
})

router.put('/:id', async (req, res) => {
  const folder = await updateFolder(req.params.id, req.body.name)

  res.send({ folder })
})

router.delete('/:id', async (req, res) => {
  const folder = await deleteFolder(req.params.id)

  res.send({ folder })
})

export default router
